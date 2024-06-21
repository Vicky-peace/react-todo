import './header.scss'
import ButtonImage from '../images/bg-desktop-dark.jpg'
const Header = () => {
  return (
    <div className='container' style={{ backgroundImage: `url(${ButtonImage})` }}>
        <h1>Todo</h1>
    </div>
  )
}

export default Header