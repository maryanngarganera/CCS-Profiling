import { useState, useEffect } from 'react'

function Home() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setData({ message: 'Welcome to CCS Profiling!' })
      setLoading(false)
    }, 500)
  }, [])

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="home-page">
      <h1>{data?.message}</h1>
      <p>Get started with your CCS Profiling application.</p>
      
      <div className="features">
        <div className="feature-card">
          <h3>Feature 1</h3>
          <p>Description for feature 1</p>
        </div>
        <div className="feature-card">
          <h3>Feature 2</h3>
          <p>Description for feature 2</p>
        </div>
        <div className="feature-card">
          <h3>Feature 3</h3>
          <p>Description for feature 3</p>
        </div>
      </div>
    </div>
  )
}

export default Home

