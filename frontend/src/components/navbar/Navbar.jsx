import "./navbar.css";
import { ReactComponent as Logo } from '../../images/openai.svg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="locontainer">
                <Logo className="logo"></Logo>
                <h2>OpenAI</h2>
            </div>
            <div className="buttons">
                <ul>
                    <div className="bundle">
                        <li><a href="#"><h3>Info</h3></a></li>
                        <ExpandMoreIcon className="icon" />
                    </div>
                    <div className="bundle">
                        <li><a href="#"><h3>About</h3></a></li>
                        <ExpandMoreIcon className="icon" />
                    </div>
                    <div className="bundle">
                        <li><a href="#"><h3>Contact</h3></a></li>
                        <ExpandMoreIcon className="icon" />
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;