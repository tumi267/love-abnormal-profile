import { useParams } from 'next/navigation'

function Slug({setter}) {
    const params=useParams()
    const {slug}=params
    setter(slug)
}

export default Slug