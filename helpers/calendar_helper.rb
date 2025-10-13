require 'digest'
require 'date'
require_relative 'hijri_date_helper'

module CalendarHelper
  YEARS_IN_PAST = 1
  YEARS_IN_FUTURE = 5

  def miqaat_events_for_ics
    current_hijri_year = HijriDate.from_gregorian(::Date.today).year
    hijri_years = ((current_hijri_year - YEARS_IN_PAST)..(current_hijri_year + YEARS_IN_FUTURE))

    events = []

    hijri_years.each do |year|
      data.miqaats.each do |entry|
        hijri_date = HijriDate.new(year, entry['month'], entry['date'])
        gregorian_date = hijri_date.to_gregorian

        entry['miqaats'].each do |miqaat|
          next if miqaat['year'] && year < miqaat['year']

          events << build_ics_event(miqaat, hijri_date, gregorian_date)
        end
      end
    end

    events.sort_by { |event| [event[:start], event[:summary]] }
  end

  def render_miqaats_calendar
    lines = []
    timestamp = Time.now.utc.strftime('%Y%m%dT%H%M%SZ')

    lines << 'BEGIN:VCALENDAR'
    lines << 'VERSION:2.0'
    lines << 'PRODID:-//Mumineen Calendar//EN'
    lines << 'CALSCALE:GREGORIAN'
    lines << 'METHOD:PUBLISH'

    miqaat_events_for_ics.each do |event|
      lines.concat(render_event(event, timestamp))
    end

    lines << 'END:VCALENDAR'
    lines.map { |line| fold_ical_line(line) }.join("\r\n") + "\r\n"
  end

  private

  def build_ics_event(miqaat, hijri_date, gregorian_date)
    summary = miqaat['title']
    summary += ' (Night)' if miqaat['phase'] == 'night'

    description_parts = []
    description_parts << miqaat['description'] if miqaat['description']
    description_parts << "Hijri date: #{HijriDate.month_name(hijri_date.month)} #{hijri_date.date}, #{hijri_date.year} AH"
    description_parts << "Phase: #{miqaat['phase'].capitalize}" if miqaat['phase']

    {
      summary: summary,
      description: description_parts.join("\n"),
      start: gregorian_date,
      end: gregorian_date + 1,
      uid: build_uid(miqaat, hijri_date)
    }
  end

  def build_uid(miqaat, hijri_date)
    digest_source = [
      miqaat['title'],
      miqaat['description'],
      miqaat['phase'],
      hijri_date.year,
      hijri_date.month,
      hijri_date.date
    ].compact.join('-')

    "#{Digest::SHA1.hexdigest(digest_source)}@mumineencalendar.com"
  end

  def render_event(event, timestamp)
    [
      'BEGIN:VEVENT',
      "UID:#{event[:uid]}",
      "DTSTAMP:#{timestamp}",
      "DTSTART;VALUE=DATE:#{event[:start].strftime('%Y%m%d')}",
      "DTEND;VALUE=DATE:#{event[:end].strftime('%Y%m%d')}",
      "SUMMARY:#{ical_escape(event[:summary])}",
      ("DESCRIPTION:#{ical_escape(event[:description])}" unless event[:description].empty?),
      'END:VEVENT'
    ].compact
  end

  def ical_escape(value)
    value
      .to_s
      .gsub('\', '\\\\')
      .gsub(';', '\\;')
      .gsub(',', '\\,')
      .gsub(/\r?\n/, '\\n')
  end

  def fold_ical_line(line)
    line.scan(/.{1,75}/).join("\r\n ")
  end
end
