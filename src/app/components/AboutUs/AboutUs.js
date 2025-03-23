// components/About.js
'use client'; // Required for client-side rendering in Next.js 13

import { useEffect, useState } from 'react';

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
    <div className="about-container">
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveAbout();
          }}
        >
          {/* Hero Section */}
          <section>
            <h2>Hero Section</h2>
            <input
              type="text"
              name="heroTitle"
              value={formData.heroTitle}
              onChange={handleInputChange}
              placeholder="Hero Title"
            />
            <textarea
              name="heroMsg"
              value={formData.heroMsg}
              onChange={handleInputChange}
              placeholder="Hero Message"
            />
          </section>

          {/* Mission Section */}
          <section>
            <h2>Mission Section</h2>
            <input
              type="text"
              name="missionTitle"
              value={formData.missionTitle}
              onChange={handleInputChange}
              placeholder="Mission Title"
            />
            <textarea
              name="missionMsg"
              value={formData.missionMsg}
              onChange={handleInputChange}
              placeholder="Mission Message"
            />
          </section>

          {/* Team Section */}
          <section>
            <h2>Team Section</h2>
            {formData.team.map((member, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="name"
                  value={member.name}
                  onChange={(e) => handleTeamMemberChange(index, e)}
                  placeholder="Name"
                />
                <input
                  type="text"
                  name="position"
                  value={member.position}
                  onChange={(e) => handleTeamMemberChange(index, e)}
                  placeholder="Position"
                />
                <button type="button" onClick={() => removeTeamMember(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addTeamMember}>
              Add Team Member
            </button>
          </section>

          {/* Impact Section */}
          <section>
            <h2>Impact Section</h2>
            <input
              type="text"
              name="impactTitle"
              value={formData.impactTitle}
              onChange={handleInputChange}
              placeholder="Impact Title"
            />
            <textarea
              name="impactMsg"
              value={formData.impactMsg}
              onChange={handleInputChange}
              placeholder="Impact Message"
            />
          </section>

          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          {/* Display About Data */}
          <section>
            <h1>{aboutData?.heroTitle}</h1>
            <p>{aboutData?.heroMsg}</p>
          </section>
          <section>
            <h2>{aboutData?.missionTitle}</h2>
            <p>{aboutData?.missionMsg}</p>
          </section>
          <section>
            <h2>Our Team</h2>
            {aboutData?.team.map((member, index) => (
              <div key={index}>
                <h3>{member.name}</h3>
                <p>{member.position}</p>
              </div>
            ))}
          </section>
          <section>
            <h2>{aboutData?.impactTitle}</h2>
            <p>{aboutData?.impactMsg}</p>
          </section>

          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={deleteAbout}>Delete</button>
        </>
      )}
    </div>
  );
}