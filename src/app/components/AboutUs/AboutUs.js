// components/About.js
'use client'; // Required for client-side rendering in Next.js 13

import { useEffect, useState } from 'react';
import styles from './AboutUs.module.css'; // Import the CSS module

export default function About() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    heroTitle: '',
    heroMsg: '',
    missionTitle: '',
    missionMsg: '',
    team: [{ name: '', position: '' }],
    impactTitle: '',
    impactMsg: '',
  });

  // Fetch About Data
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
        });

        const result = await response.json();

        if (result.errors) {
          throw new Error(result.errors[0].message);
        }

        setAboutData(result.data.about);
        setFormData(result.data.about || {
          heroTitle: '',
          heroMsg: '',
          missionTitle: '',
          missionMsg: '',
          team: [{ name: '', position: '' }],
          impactTitle: '',
          impactMsg: '',
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle Team Member Change
  const handleTeamMemberChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTeam = [...formData.team];
    updatedTeam[index][name] = value;
    setFormData({
      ...formData,
      team: updatedTeam,
    });
  };

  // Add Team Member
  const addTeamMember = () => {
    setFormData({
      ...formData,
      team: [...formData.team, { name: '', position: '' }],
    });
  };

  // Remove Team Member
  const removeTeamMember = (index) => {
    const updatedTeam = formData.team.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      team: updatedTeam,
    });
  };

  // Save About Data (Add or Update)
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
            id: aboutData?.id || 'aboutDocumentId', // Use a fixed ID for the single document
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
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      setAboutData(result.data.saveAbout);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete About Data
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
            id: aboutData?.id || 'aboutDocumentId', // Use a fixed ID for the single document
          },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      setAboutData(null); // Clear the data after deletion
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.aboutContainer}>
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveAbout();
          }}
          className={styles.aboutForm}
        >
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
            <h2>Team Section</h2>
            {formData.team.map((member, index) => (
              <div key={index} className={styles.teamMember}>
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
                <button type="button" onClick={() => removeTeamMember(index)} className={styles.removeButton}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addTeamMember} className={styles.addButton}>
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
            <button type="button" onClick={() => setIsEditing(false)} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          {/* Display About Data */}
          <section className={styles.aboutSection}>
            <h1 className={styles.heroTitle}>{aboutData?.heroTitle}</h1>
            <p className={styles.heroMessage}>{aboutData?.heroMsg}</p>
          </section>
          <section className={styles.aboutSection}>
            <h2 className={styles.missionTitle}>{aboutData?.missionTitle}</h2>
            <p className={styles.missionMessage}>{aboutData?.missionMsg}</p>
          </section>
          <section className={styles.aboutSection}>
            <h2 className={styles.teamTitle}>Our Team</h2>
            {aboutData?.team.map((member, index) => (
              <div key={index} className={styles.teamMember}>
                <h3 className={styles.teamMemberName}>{member.name}</h3>
                <p className={styles.teamMemberPosition}>{member.position}</p>
              </div>
            ))}
          </section>
          <section className={styles.aboutSection}>
            <h2 className={styles.impactTitle}>{aboutData?.impactTitle}</h2>
            <p className={styles.impactMessage}>{aboutData?.impactMsg}</p>
          </section>

          <div className={styles.actions}>
            <button onClick={() => setIsEditing(true)} className={styles.editButton}>Edit</button>
            <button onClick={deleteAbout} className={styles.deleteButton}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}