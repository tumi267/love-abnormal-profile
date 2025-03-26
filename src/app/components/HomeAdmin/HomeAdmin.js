'use client'
import { useState, useEffect } from 'react'
import styles from './HomeAdmin.module.css'
import Hero from '../Hero/Hero'
import SubHeading from '../SubHeading/SubHeading'
import ColumInfo from '../ColumInfo/ColumInfo'
import ImageDiscriptionBottom from '../ImageDiscriptionBottom/ImageDiscriptionBottom'
import CallToAction from '../CallToAction/CallToAction'
import Slider from '../slider/Slider'

function HomeAdmin() {
  const [homeData, setHomeData] = useState(null)
  const [articles, setArticles] = useState([])
  const [editingSection, setEditingSection] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const emptyFormData = {
    hero: {
      url: '',
      imagediscription: '',
      hHeight: '350',
      welcome: 'Welcome to Empowering Abilities: Sport and Health for All',
      msg: 'At Empowering Abilities, we believe that every person, regardless of ability, has the power to achieve greatness...',
      calltoaction: { name: 'Donate', link: 'donation' },
      calltoaction2: { name: 'doctors', link: 'practitioners' }
    },
    subHeading: {
      heading: 'Empowering All Abilities: Advancing Health, Sports, and Wellness for Everyone',
      msg: 'At our core, we are committed to promoting health, physical activity, and inclusion for individuals of all abilities...'
    },
    columnInfo: [
      { title: 'Smart Solutions Through Data', msg: 'Introducing our participant-centered wellness database...', url: '' },
      { title: 'Breaking Barriers, Expanding Opportunities', msg: 'Expanding access to evidence-based virtual health programs...', url: '' },
      { title: 'Strengthening Skills, Transforming Lives', msg: 'Strengthening the field of disability health through education...', url: '' }
    ],
    imageDescriptions: [
      { title: 'Empower Inclusive Wellness in Your Community', discprtion: 'Join us in expanding access to adaptive sports, health programs...', url: '' },
      { title: 'Your Partner in Inclusive Health & Wellness', discprtion: 'Discover evidence-based programs and resources designed...', url: '' }
    ],
    callToAction: { name: 'Donate', link: 'donation' }
  }

  const [formData, setFormData] = useState(emptyFormData)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch home data
        const homeResponse = await fetch('/api/homegraphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: `{ home { id hero { url imagediscription hHeight welcome msg calltoaction { name link } calltoaction2 { name link } } subHeading { heading msg } columnInfo { title msg url } imageDescriptions { title discprtion url } callToAction { name link } } }` })
        })
        const homeResult = await homeResponse.json()
        
        // Fetch latest articles
        const blogResponse = await fetch('/api/bloggraphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: `{ articles(limit: 10) { id title preview date href image } }` })
        })
        const blogResult = await blogResponse.json()

        if (homeResult.data?.home) {
          setHomeData(homeResult.data.home)
          setFormData(homeResult.data.home)
        } else {
          setEditingSection('all')
        }

        if (blogResult.data?.articles) {
          setArticles(blogResult.data.articles)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleInputChange = (e, section, nestedKey = null) => {
    const { name, value } = e.target
    if (nestedKey) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [nestedKey]: {
            ...prev[section][nestedKey],
            [name]: value
          }
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: value
        }
      }))
    }
  }

  const handleArrayItemChange = (e, section, index, field) => {
    const { value } = e.target
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }))
  }

  const addArrayItem = (section, template) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], template]
    }))
  }

  const removeArrayItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }))
  }

  const saveChanges = async () => {
    try {
      const response = await fetch('/api/homegraphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation SaveHome($id: ID!, $input: HomeInput!) {
              saveHome(id: $id, input: $input) {
                id
              }
            }
          `,
          variables: {
            id: homeData?.id || 'homepage',
            input: {
              hero: formData.hero,
              subHeading: formData.subHeading,
              columnInfo: formData.columnInfo,
              imageDescriptions: formData.imageDescriptions,
              callToAction: formData.callToAction
            }
          }
        })
      })
      const { data } = await response.json()
      if (data?.saveHome) {
        setHomeData({ ...formData, id: data.saveHome.id })
        setEditingSection(null)
      }
    } catch (error) {
      console.error('Error saving home data:', error)
    }
  }

  const startEditing = (section) => {
    setFormData(homeData || formData)
    setEditingSection(section)
  }

  if (isLoading) return <div className={styles.loading}>Loading...</div>

  const showEditMode = !homeData || editingSection === 'all'
  const currentData = showEditMode ? formData : homeData

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <div className={styles.sectionContainer}>
        {showEditMode || editingSection === 'hero' ? (
          <div className={styles.editForm}>
            <h3>{homeData ? 'Edit' : 'Create'} Hero Section</h3>
            <input name="url" value={formData.hero.url} onChange={(e) => handleInputChange(e, 'hero')} placeholder="Image URL" />
            <input name="imagediscription" value={formData.hero.imagediscription} onChange={(e) => handleInputChange(e, 'hero')} placeholder="Image Description" />
            <input name="welcome" value={formData.hero.welcome} onChange={(e) => handleInputChange(e, 'hero')} placeholder="Welcome Message" />
            <textarea name="msg" value={formData.hero.msg} onChange={(e) => handleInputChange(e, 'hero')} placeholder="Hero Message" />
            <div className={styles.nestedInputs}>
              <h4>Call to Action 1</h4>
              <input name="name" value={formData.hero.calltoaction.name} onChange={(e) => handleInputChange(e, 'hero', 'calltoaction')} placeholder="Button Text" />
              <input name="link" value={formData.hero.calltoaction.link} onChange={(e) => handleInputChange(e, 'hero', 'calltoaction')} placeholder="Button Link" />
            </div>
            <div className={styles.nestedInputs}>
              <h4>Call to Action 2</h4>
              <input name="name" value={formData.hero.calltoaction2.name} onChange={(e) => handleInputChange(e, 'hero', 'calltoaction2')} placeholder="Button Text" />
              <input name="link" value={formData.hero.calltoaction2.link} onChange={(e) => handleInputChange(e, 'hero', 'calltoaction2')} placeholder="Button Link" />
            </div>
            <div className={styles.formActions}>
              <button onClick={saveChanges}>Save</button>
              {homeData && <button onClick={() => setEditingSection(null)}>Cancel</button>}
            </div>
          </div>
        ) : (
          <>
            <Hero {...currentData.hero} />
            <button onClick={() => startEditing('hero')}>Edit Hero</button>
          </>
        )}
      </div>

      {/* SubHeading Section */}
      <div className={styles.sectionContainer}>
        {showEditMode || editingSection === 'subHeading' ? (
          <div className={styles.editForm}>
            <h3>{homeData ? 'Edit' : 'Create'} SubHeading</h3>
            <input name="heading" value={formData.subHeading.heading} onChange={(e) => handleInputChange(e, 'subHeading')} placeholder="Heading" />
            <textarea name="msg" value={formData.subHeading.msg} onChange={(e) => handleInputChange(e, 'subHeading')} placeholder="Message" />
            <div className={styles.formActions}>
              <button onClick={saveChanges}>Save</button>
              {homeData && <button onClick={() => setEditingSection(null)}>Cancel</button>}
            </div>
          </div>
        ) : (
          <>
            <SubHeading {...currentData.subHeading} />
            <button onClick={() => startEditing('subHeading')}>Edit SubHeading</button>
          </>
        )}
      </div>

      {/* ColumnInfo Section */}
      <div className={styles.sectionContainer}>
        {showEditMode || editingSection === 'columnInfo' ? (
          <div className={styles.editForm}>
            <h3>{homeData ? 'Edit' : 'Create'} Column Info</h3>
            {formData.columnInfo.map((item, index) => (
              <div key={index} className={styles.arrayItem}>
                <input value={item.title} onChange={(e) => handleArrayItemChange(e, 'columnInfo', index, 'title')} placeholder="Title" />
                <textarea value={item.msg} onChange={(e) => handleArrayItemChange(e, 'columnInfo', index, 'msg')} placeholder="Message" />
                <input value={item.url} onChange={(e) => handleArrayItemChange(e, 'columnInfo', index, 'url')} placeholder="Image URL" />
                <button onClick={() => removeArrayItem('columnInfo', index)} className={styles.removeButton}>Remove</button>
              </div>
            ))}
            <button onClick={() => addArrayItem('columnInfo', { title: '', msg: '', url: '' })} className={styles.addButton}>Add Column</button>
            <div className={styles.formActions}>
              <button onClick={saveChanges}>Save</button>
              {homeData && <button onClick={() => setEditingSection(null)}>Cancel</button>}
            </div>
          </div>
        ) : (
          <>
            <ColumInfo infoarr={currentData.columnInfo} />
            <button onClick={() => startEditing('columnInfo')}>Edit Column Info</button>
          </>
        )}
      </div>

      {/* ImageDescriptions Section */}
      <div className={styles.sectionContainer}>
        {showEditMode || editingSection === 'imageDescriptions' ? (
          <div className={styles.editForm}>
            <h3>{homeData ? 'Edit' : 'Create'} Image Descriptions</h3>
            {formData.imageDescriptions.map((item, index) => (
              <div key={index} className={styles.arrayItem}>
                <input value={item.title} onChange={(e) => handleArrayItemChange(e, 'imageDescriptions', index, 'title')} placeholder="Title" />
                <textarea value={item.discprtion} onChange={(e) => handleArrayItemChange(e, 'imageDescriptions', index, 'discprtion')} placeholder="Description" />
                <input value={item.url} onChange={(e) => handleArrayItemChange(e, 'imageDescriptions', index, 'url')} placeholder="Image URL" />
                <button onClick={() => removeArrayItem('imageDescriptions', index)} className={styles.removeButton}>Remove</button>
              </div>
            ))}
            <button onClick={() => addArrayItem('imageDescriptions', { title: '', discprtion: '', url: '' })} className={styles.addButton}>Add Image Description</button>
            <div className={styles.formActions}>
              <button onClick={saveChanges}>Save</button>
              {homeData && <button onClick={() => setEditingSection(null)}>Cancel</button>}
            </div>
          </div>
        ) : (
          <>
            <div className={styles.pitch}>
              {currentData.imageDescriptions.map((item, index) => (
                <ImageDiscriptionBottom key={index} {...item} />
              ))}
            </div>
            <button onClick={() => startEditing('imageDescriptions')}>Edit Image Descriptions</button>
          </>
        )}
      </div>

      {/* Slider Section */}
      <div className={styles.sectionContainer}>
        <h3>Latest Articles</h3>
        <Slider sliderarr={articles} />
        <p className={styles.note}>Note: Articles are managed in the Blog section</p>
      </div>

      {/* CallToAction Section */}
      <div className={styles.sectionContainer}>
        {showEditMode || editingSection === 'callToAction' ? (
          <div className={styles.editForm}>
            <h3>{homeData ? 'Edit' : 'Create'} Call To Action</h3>
            <input name="name" value={formData.callToAction.name} onChange={(e) => handleInputChange(e, 'callToAction')} placeholder="Button Text" />
            <input name="link" value={formData.callToAction.link} onChange={(e) => handleInputChange(e, 'callToAction')} placeholder="Button Link" />
            <div className={styles.formActions}>
              <button onClick={saveChanges}>Save</button>
              {homeData && <button onClick={() => setEditingSection(null)}>Cancel</button>}
            </div>
          </div>
        ) : (
          <>
            <div className={styles.callToAction}>
              <CallToAction {...currentData.callToAction} />
            </div>
            <button onClick={() => startEditing('callToAction')}>Edit Call To Action</button>
          </>
        )}
      </div>

      {/* Save All Button */}
      {!homeData && (
        <div className={styles.saveAllContainer}>
          <button className={styles.saveAllButton} onClick={saveChanges}>Save All Sections</button>
        </div>
      )}
    </main>
  )
}

export default HomeAdmin