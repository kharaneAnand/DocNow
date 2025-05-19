import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const specialities = ['General Physician', 'Gynecologist', 'Dermatologist', 'Pediatrician', 'Neurologist' , 'Gastroenterologist']

const Doctors = () => {
  const { speciality } = useParams()
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const [filterDoc, setFilterDoc] = useState([])
  const [search, setSearch] = useState('')
  const [showFilter, setShowFilter] = useState(false) // 👈 Mobile filter toggle

  useEffect(() => {
    let filtered = doctors

    if (speciality) {
      const decoded = decodeURIComponent(speciality).toLowerCase().trim()
      filtered = filtered.filter(doc => doc.speciality.toLowerCase().trim() === decoded)
    }

    if (search.trim() !== '') {
      filtered = filtered.filter(doc => doc.name.toLowerCase().includes(search.toLowerCase()))
    }

    setFilterDoc(filtered)
  }, [doctors, speciality, search])

  return (
    <div className="min-h-screen bg-indigo-50 px-4 sm:px-10 py-10 mb-16">
      {/* Page Title */}
      <h1 className="text-3xl font-extrabold text-indigo-900 mb-6 select-none">
        {speciality ? `Doctors — ${speciality}` : 'All Doctors'}
      </h1>

      {/* Mobile Filter Button */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <button
          onClick={() => setShowFilter(prev => !prev)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          {showFilter ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar filter */}
        <div className={`md:block ${showFilter ? 'block' : 'hidden'} w-full md:w-64`}>
          <aside className="bg-white rounded-xl shadow-md p-6 mb-8 md:mb-0">
            <h2 className="text-xl font-semibold text-indigo-700 mb-5 select-none">Filter by Specialty</h2>
            <ul className="flex flex-col gap-3">
              {specialities.map(cat => {
                const active = speciality === cat
                return (
                  <li
                    key={cat}
                    onClick={() => {
                      if (active) {
                        navigate('/doctors')
                      } else {
                        navigate(`/doctors/${cat}`)
                      }
                      setShowFilter(false) // 👈 auto-hide on filter apply
                    }}
                    className={`cursor-pointer rounded-lg px-4 py-2 font-medium select-none transition-colors duration-300
                      ${active
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-indigo-700 hover:bg-indigo-100 hover:text-indigo-900'}
                    `}
                  >
                    {cat}
                  </li>
                )
              })}
            </ul>

            {/* Search bar */}
            <div className="mt-8">
              <input
                type="search"
                placeholder="Search a Doctor"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full rounded-lg border border-indigo-300 px-4 py-2 text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </aside>
        </div>

        {/* Doctors grid */}
        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filterDoc.length === 0 ? (
            <p className="text-indigo-400 text-lg col-span-full text-center mt-16 select-none">
              No doctors found.
            </p>
          ) : (
            filterDoc.map(doc => (
              <div
                key={doc._id}
                onClick={() => navigate(`/appointment/${doc._id}`)}
                className="cursor-pointer rounded-2xl bg-white shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 overflow-hidden"
              >
                <div className="w-full overflow-hidden rounded-t-2xl bg-indigo-100 h-48 sm:h-56">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-green-600 font-semibold text-sm">
                    <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse inline-block"></span> Available
                  </div>
                  <p className="text-indigo-900 font-bold text-lg truncate">{doc.name}</p>
                  <p className="text-indigo-600 text-sm">{doc.speciality}</p>
                </div>
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  )
}

export default Doctors
