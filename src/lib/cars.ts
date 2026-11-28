export type CarCategory =
  | "Sedan"
  | "SUV"
  | "Hatchback"
  | "Coupe"
  | "Luxury"

export type Transmission = "manual" | "automatic"

export type FuelType = "petrol" | "diesel" | "hybrid" | "electric"

export type CarStatus = "approved" | "pending" | "rejected"

export type Car = {
  id: string
  brand: string
  model: string
  category: CarCategory
  location: string
  dailyRate: number
  transmission: Transmission
  fuelType: FuelType
  seats: number
  image: string
  status: CarStatus
  isActive: boolean
  createdAt: string
}

export type CarSort = "newest" | "rate-asc" | "rate-desc"

export type CarFilters = {
  query: string
  category: string
  location: string
  minRate: string
  maxRate: string
  transmission: string
  fuelType: string
  seats: string
}

export const initialCarFilters: CarFilters = {
  query: "",
  category: "all",
  location: "all",
  minRate: "",
  maxRate: "",
  transmission: "all",
  fuelType: "all",
  seats: "all",
}

export const carCategories: CarCategory[] = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Coupe",
  "Luxury",
]

export const transmissionLabels: Record<Transmission, string> = {
  manual: "Manual",
  automatic: "Automatic",
}

export const fuelTypeLabels: Record<FuelType, string> = {
  petrol: "Petrol",
  diesel: "Diesel",
  hybrid: "Hybrid",
  electric: "Electric",
}

const image = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`

// Dummy inventory. Replace `dummyCars` with a database query later.
const dummyCars: Car[] = [
  {
    id: "car-01",
    brand: "Audi",
    model: "A7",
    category: "Luxury",
    location: "New York",
    dailyRate: 185,
    transmission: "automatic",
    fuelType: "petrol",
    seats: 5,
    image: image("1616422285623-13ff0162193c"),
    status: "approved",
    isActive: true,
    createdAt: "2026-11-18",
  },
  {
    id: "car-02",
    brand: "Hyundai",
    model: "Accent",
    category: "Sedan",
    location: "Los Angeles",
    dailyRate: 45,
    transmission: "manual",
    fuelType: "petrol",
    seats: 5,
    image: image("1619767886558-efdc259cde1a"),
    status: "approved",
    isActive: true,
    createdAt: "2026-10-02",
  },
  {
    id: "car-03",
    brand: "Fiat",
    model: "500e",
    category: "Hatchback",
    location: "Chicago",
    dailyRate: 42,
    transmission: "automatic",
    fuelType: "electric",
    seats: 4,
    image: image("1549317661-bd32c8ce0db2"),
    status: "approved",
    isActive: true,
    createdAt: "2026-11-24",
  },
  {
    id: "car-04",
    brand: "Mercedes-AMG",
    model: "GT",
    category: "Luxury",
    location: "Miami",
    dailyRate: 240,
    transmission: "automatic",
    fuelType: "petrol",
    seats: 2,
    image: image("1553440569-bcc63803a83d"),
    status: "approved",
    isActive: true,
    createdAt: "2026-09-14",
  },
  {
    id: "car-05",
    brand: "Porsche",
    model: "911 Carrera",
    category: "Luxury",
    location: "Los Angeles",
    dailyRate: 265,
    transmission: "automatic",
    fuelType: "petrol",
    seats: 4,
    image: image("1503376780353-7e6692767b70"),
    status: "approved",
    isActive: true,
    createdAt: "2026-08-21",
  },
  {
    id: "car-06",
    brand: "Chevrolet",
    model: "Camaro",
    category: "Coupe",
    location: "Miami",
    dailyRate: 150,
    transmission: "manual",
    fuelType: "petrol",
    seats: 4,
    image: image("1552519507-da3b142c6e3d"),
    status: "approved",
    isActive: true,
    createdAt: "2026-07-30",
  },
  {
    id: "car-07",
    brand: "Ford",
    model: "Mustang",
    category: "Coupe",
    location: "Miami",
    dailyRate: 135,
    transmission: "manual",
    fuelType: "petrol",
    seats: 4,
    image: image("1494976388531-d1058494cdd8"),
    status: "approved",
    isActive: true,
    createdAt: "2026-06-11",
  },
  {
    id: "car-08",
    brand: "Audi",
    model: "A6",
    category: "Sedan",
    location: "New York",
    dailyRate: 120,
    transmission: "automatic",
    fuelType: "diesel",
    seats: 5,
    image: image("1502877338535-766e1452684a"),
    status: "approved",
    isActive: true,
    createdAt: "2026-05-19",
  },
  {
    id: "car-09",
    brand: "BMW",
    model: "330e",
    category: "Sedan",
    location: "Chicago",
    dailyRate: 115,
    transmission: "automatic",
    fuelType: "hybrid",
    seats: 5,
    image: image("1555215695-3004980ad54e"),
    status: "approved",
    isActive: true,
    createdAt: "2026-11-08",
  },
  {
    id: "car-10",
    brand: "Range Rover",
    model: "Velar",
    category: "SUV",
    location: "Denver",
    dailyRate: 175,
    transmission: "automatic",
    fuelType: "diesel",
    seats: 5,
    image: image("1568605117036-5fe5e7bab0b7"),
    status: "approved",
    isActive: true,
    createdAt: "2026-04-03",
  },
  {
    id: "car-11",
    brand: "Honda",
    model: "Fit",
    category: "Hatchback",
    location: "San Francisco",
    dailyRate: 55,
    transmission: "manual",
    fuelType: "petrol",
    seats: 5,
    image: image("1533473359331-0135ef1b58bf"),
    status: "approved",
    isActive: true,
    createdAt: "2026-03-27",
  },
  {
    id: "car-12",
    brand: "Lamborghini",
    model: "Huracán",
    category: "Luxury",
    location: "Miami",
    dailyRate: 420,
    transmission: "automatic",
    fuelType: "petrol",
    seats: 2,
    image: image("1583121274602-3e2820c69888"),
    status: "approved",
    isActive: true,
    createdAt: "2026-02-15",
  },
  // Not shown in the listing: only approved and active cars are published.
  {
    id: "car-13",
    brand: "Toyota",
    model: "Corolla",
    category: "Sedan",
    location: "Denver",
    dailyRate: 50,
    transmission: "automatic",
    fuelType: "petrol",
    seats: 5,
    image: image("1619767886558-efdc259cde1a"),
    status: "pending",
    isActive: true,
    createdAt: "2026-11-25",
  },
  {
    id: "car-14",
    brand: "Mazda",
    model: "CX-5",
    category: "SUV",
    location: "San Francisco",
    dailyRate: 85,
    transmission: "automatic",
    fuelType: "petrol",
    seats: 5,
    image: image("1568605117036-5fe5e7bab0b7"),
    status: "approved",
    isActive: false,
    createdAt: "2026-11-22",
  },
]

/** Cars that are visible to the public: approved and active. */
export function getAvailableCars(): Car[] {
  return dummyCars.filter((car) => car.status === "approved" && car.isActive)
}

export function filterAndSortCars(
  cars: Car[],
  filters: CarFilters,
  sort: CarSort
): Car[] {
  const query = filters.query.trim().toLowerCase()
  const minRate = filters.minRate === "" ? null : Number(filters.minRate)
  const maxRate = filters.maxRate === "" ? null : Number(filters.maxRate)
  const minSeats = filters.seats === "all" ? null : Number(filters.seats)

  const results = cars.filter((car) => {
    if (
      query &&
      !`${car.brand} ${car.model}`.toLowerCase().includes(query)
    ) {
      return false
    }
    if (filters.category !== "all" && car.category !== filters.category) {
      return false
    }
    if (filters.location !== "all" && car.location !== filters.location) {
      return false
    }
    if (minRate !== null && car.dailyRate < minRate) return false
    if (maxRate !== null && car.dailyRate > maxRate) return false
    if (
      filters.transmission !== "all" &&
      car.transmission !== filters.transmission
    ) {
      return false
    }
    if (filters.fuelType !== "all" && car.fuelType !== filters.fuelType) {
      return false
    }
    if (minSeats !== null && car.seats < minSeats) return false

    return true
  })

  switch (sort) {
    case "rate-asc":
      return results.sort((a, b) => a.dailyRate - b.dailyRate)
    case "rate-desc":
      return results.sort((a, b) => b.dailyRate - a.dailyRate)
    default:
      return results.sort(
        (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
      )
  }
}

export function hasActiveFilters(filters: CarFilters): boolean {
  return (Object.keys(initialCarFilters) as (keyof CarFilters)[]).some(
    (key) => filters[key] !== initialCarFilters[key]
  )
}
