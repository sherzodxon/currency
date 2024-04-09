import './index.scss'
type HeaderProps = {}

const Header:React.FC<HeaderProps> = () => {
    return (
        <div className='header'>
             <img className='header__img' width="36" height="36" src={require('../../../assets/image/currency.png')} alt="currency"/>
            <span>Valyuta kurslari
          </span>
        </div>
    );
}
 
 
export default Header;