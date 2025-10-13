require 'date'

# Ruby port of the JavaScript HijriDate helper used by the front-end.
# Provides conversions between Hijri (Islamic) and Gregorian calendars so we
# can generate data files (like ICS) at build time.
class HijriDate
  KABISA_YEAR_REMAINDERS = [2, 5, 8, 10, 13, 16, 19, 21, 24, 27, 29].freeze

  DAYS_IN_YEAR = [30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325].freeze

  DAYS_IN_30_YEARS = [
    354, 708, 1_063, 1_417, 1_771, 2_126, 2_480, 2_834, 3_189, 3_543,
    3_898, 4_252, 4_606, 4_961, 5_315, 5_669, 6_024, 6_378, 6_732, 7_087,
    7_441, 7_796, 8_150, 8_504, 8_859, 9_213, 9_567, 9_922, 10_276, 10_631
  ].freeze

  MONTH_NAMES = [
    'Moharram al-Haraam',
    'Safar al-Muzaffar',
    'Rabi al-Awwal',
    'Rabi al-Aakhar',
    'Jumada al-Ula',
    'Jumada al-Ukhra',
    'Rajab al-Asab',
    'Shabaan al-Karim',
    'Ramadaan al-Moazzam',
    'Shawwal al-Mukarram',
    'Zilqadah al-Haraam',
    'Zilhaj al-Haraam'
  ].freeze

  SHORT_MONTH_NAMES = [
    'Moharram',
    'Safar',
    'Rabi I',
    'Rabi II',
    'Jumada I',
    'Jumada II',
    'Rajab',
    'Shabaan',
    'Ramadaan',
    'Shawwal',
    'Zilqadah',
    'Zilhaj'
  ].freeze

  attr_reader :year, :month, :date

  def initialize(year, month, date)
    @year = year
    @month = month
    @date = date
  end

  def self.month_name(month)
    MONTH_NAMES.fetch(month)
  end

  def self.short_month_name(month)
    SHORT_MONTH_NAMES.fetch(month)
  end

  def self.from_gregorian(date)
    from_ajd(gregorian_to_ajd(date))
  end

  def self.days_in_month(year, month)
    ((month == 11) && kabisa_year?(year)) || (month.even?) ? 30 : 29
  end

  def to_gregorian
    self.class.ajd_to_gregorian(to_ajd)
  end

  def day_of_year
    month.zero? ? date : DAYS_IN_YEAR[month - 1] + date
  end

  def to_ajd
    y30 = (year / 30.0).floor
    ajd = 1_948_083.5 + y30 * 10_631 + day_of_year
    ajd += DAYS_IN_30_YEARS[year - y30 * 30 - 1] if (year % 30).positive?
    ajd
  end

  def self.ajd_to_gregorian(ajd)
    z = (ajd + 0.5).floor
    f = (ajd + 0.5 - z)

    a = if z < 2_299_161
          z
        else
          alpha = ((z - 1_867_216.25) / 36_524.25).floor
          z + 1 + alpha - (alpha / 4).floor
        end

    b = a + 1_524
    c = ((b - 122.1) / 365.25).floor
    d = (365.25 * c).floor
    e = ((b - d) / 30.6001).floor

    day = b - d - (30.6001 * e).floor + f
    month = e < 14 ? (e - 1) : (e - 13)
    year = month <= 2 ? (c - 4_715) : (c - 4_716)

    day_integer = day.floor
    day_integer += 1 if (day - day_integer) > 0.999999

    ::Date.new(year, month, day_integer)
  end

  def self.gregorian_to_ajd(date)
    normalized = normalize_gregorian(date)

    year = normalized.year
    month = normalized.month
    day = normalized.day + normalized.hour / 24.0 + normalized.min / 1_440.0 +
          normalized.sec / 86_400.0 + normalized.usec / 86_400_000_000.0

    if month < 3
      year -= 1
      month += 12
    end

    b = if julian?(normalized)
          0
        else
          a = (year / 100).floor
          2 - a + (a / 4).floor
        end

    (365.25 * (year + 4_716)).floor + (30.6001 * (month + 1)).floor + day + b - 1_524.5
  end

  def self.normalize_gregorian(date)
    return date if date.is_a?(::Time)
    if date.is_a?(::DateTime)
      ::Time.utc(date.year, date.month, date.day, date.hour, date.min, date.sec)
    elsif date.is_a?(::Date)
      ::Time.utc(date.year, date.month, date.day)
    else
      raise ArgumentError, "Unsupported date-like object: #{date.inspect}"
    end
  end

  def self.julian?(date)
    return true if date.year < 1_582
    return false if date.year > 1_582

    return true if date.month < 10
    return false if date.month > 10

    date.day < 5
  end

  def self.kabisa_year?(year)
    KABISA_YEAR_REMAINDERS.include?(year % 30)
  end
end
