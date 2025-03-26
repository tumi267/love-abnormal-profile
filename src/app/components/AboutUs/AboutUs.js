'use client'
import { useEffect, useState } from 'react'
import styles from './AboutUs.module.css'

export default function About() {
  const [aboutData, setAboutData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    heroTitle: '',
    heroMsg: '',
    missionTitle: '',
    missionMsg: '',
    team: [{ name: '', position: '' }],
    impactTitle: '',
    impactMsg: '',
  })

  // Fetch About Data (your exact implementation)
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('/api/aboutgraphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query {
                about {
                  id
                  heroTitle
                  heroMsg
                  missionTitle
                  missionMsg
                  team {
                    name
                    position
                  }
                  impactTitle
                  impactMsg
                }
              }
            `,
          }),
        })

        const result = await response.json()

        if (result.errors) {
          throw new Error(result.errors[0].message)
        }

        setAboutData(result.data.about)
        setFormData(result.data.about || {
          heroTitle: '',
          heroMsg: '',
          missionTitle: '',
          missionMsg: '',
          team: [{ name: '', position: '' }],
          impactTitle: '',
          impactMsg: '',
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAboutData()
  }, [])

  // Your exact input handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleTeamMemberChange = (index, e) => {
    const { name, value } = e.target
    const updatedTeam = [...formData.team]
    updatedTeam[index][name] = value
    setFormData({
      ...formData,
      team: updatedTeam,
    })
  }

  const addTeamMember = () => {
    setFormData({
      ...formData,
      team: [...formData.team, { name: '', position: '' }],
    })
  }

  const removeTeamMember = (index) => {
    const updatedTeam = formData.team.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      team: updatedTeam,
    })
  }

  // Your exact saveAbout implementation
  const saveAbout = async () => {
    try {
      const response = await fetch('/api/aboutgraphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation SaveAbout($id: ID!, $input: AboutInput!) {
              saveAbout(id: $id, input: $input) {
                id
                heroTitle
                heroMsg
                missionTitle
                missionMsg
                team {
                  name
                  position
                }
                impactTitle
                impactMsg
              }
            }
          `,
          variables: {
            id: aboutData?.id || 'aboutDocumentId',
            input: {
              heroTitle: formData.heroTitle,
              heroMsg: formData.heroMsg,
              missionTitle: formData.missionTitle,
              missionMsg: formData.missionMsg,
              team: formData.team,
              impactTitle: formData.impactTitle,
              impactMsg: formData.impactMsg,
            },
          },
        }),
      })

      const result = await response.json()

      if (result.errors) {
        throw new Error(result.errors[0].message)
      }

      setAboutData(result.data.saveAbout)
      setIsEditing(false)
    } catch (err) {
      setError(err.message)
    }
  }

  // Your exact deleteAbout implementation
  const deleteAbout = async () => {
    try {
      const response = await fetch('/api/aboutgraphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation DeleteAbout($id: ID!) {
              deleteAbout(id: $id)
            }
          `,
          variables: {
            id: aboutData?.id || 'aboutDocumentId',
          },
        }),
      })

      const result = await response.json()

      if (result.errors) {
        throw new Error(result.errors[0].message)
      }

      setAboutData(null)
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <div className={styles.container}>Loading...</div>
  if (error) return <div className={styles.container}>Error: {error}</div>

  return (
    <div className={styles.container}>
      {isEditing ? (
        <form onSubmit={(e) => { e.preventDefault(); saveAbout(); }} className={styles.editForm}>
          {/* Hero Section */}
          <section className={styles.formSection}>
            <h2>Hero Section</h2>
            <input
              type="text"
              name="heroTitle"
              value={formData.heroTitle}
              onChange={handleInputChange}
              placeholder="Hero Title"
              className={styles.formInput}
            />
            <textarea
              name="heroMsg"
              value={formData.heroMsg}
              onChange={handleInputChange}
              placeholder="Hero Message"
              className={styles.formTextarea}
            />
          </section>

          {/* Mission Section */}
          <section className={styles.formSection}>
            <h2>Mission Section</h2>
            <input
              type="text"
              name="missionTitle"
              value={formData.missionTitle}
              onChange={handleInputChange}
              placeholder="Mission Title"
              className={styles.formInput}
            />
            <textarea
              name="missionMsg"
              value={formData.missionMsg}
              onChange={handleInputChange}
              placeholder="Mission Message"
              className={styles.formTextarea}
            />
          </section>

          {/* Team Section */}
          <section className={styles.formSection}>
            <h2>Team Members</h2>
            {formData.team.map((member, index) => (
              <div key={index} className={styles.teamMemberForm}>
                <input
                  type="text"
                  name="name"
                  value={member.name}
                  onChange={(e) => handleTeamMemberChange(index, e)}
                  placeholder="Name"
                  className={styles.formInput}
                />
                <input
                  type="text"
                  name="position"
                  value={member.position}
                  onChange={(e) => handleTeamMemberChange(index, e)}
                  placeholder="Position"
                  className={styles.formInput}
                />
                <button 
                  type="button" 
                  onClick={() => removeTeamMember(index)} 
                  className={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            ))}
            <button 
              type="button" 
              onClick={addTeamMember} 
              className={styles.addButton}
            >
              Add Team Member
            </button>
          </section>

          {/* Impact Section */}
          <section className={styles.formSection}>
            <h2>Impact Section</h2>
            <input
              type="text"
              name="impactTitle"
              value={formData.impactTitle}
              onChange={handleInputChange}
              placeholder="Impact Title"
              className={styles.formInput}
            />
            <textarea
              name="impactMsg"
              value={formData.impactMsg}
              onChange={handleInputChange}
              placeholder="Impact Message"
              className={styles.formTextarea}
            />
          </section>

          <div className={styles.formActions}>
            <button type="submit" className={styles.saveButton}>Save</button>
            <button 
              type="button" 
              onClick={() => setIsEditing(false)} 
              className={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          {/* Hero Section */}
          <section className={styles.hero}>
            <h1>{aboutData?.heroTitle || 'About Our NPO'}</h1>
            <p>{aboutData?.heroMsg || ''}</p>
          </section>

          {/* Mission Section */}
          <section className={styles.mission}>
            <h2>{aboutData?.missionTitle || 'Our Mission'}</h2>
            <p>{aboutData?.missionMsg || ''}</p>
          </section>

          {/* Team Section */}
          <section className={styles.team}>
            <h2>Meet Our Team</h2>
            <div className={styles.teamGrid}>
              {aboutData?.team?.map((member, index) => (
                <div key={index} className={styles.teamMember}>
                  <h3>{member.name}</h3>
                  <p>{member.position}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Impact Section */}
          <section className={styles.impact}>
            <h2>{aboutData?.impactTitle || 'Our Impact'}</h2>
            <p>{aboutData?.impactMsg || ''}</p>
          </section>

          {/* Admin Actions */}
          <div className={styles.adminActions}>
            <button 
              onClick={() => setIsEditing(true)} 
              className={styles.editButton}
            >
              Edit
            </button>
            <button 
              onClick={deleteAbout} 
              className={styles.deleteButton}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  )
}