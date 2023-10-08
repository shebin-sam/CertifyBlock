import {Link} from "react-router-dom";
const Navigation =()=>{
    return(
        <header>
        <div className="logo">Certify Block</div>
        <nav>
          <ul>
          <li>
              <Link className="nav_link" to="/">
                Login
              </Link>
            </li>
            <li>
              <Link className="nav_link" to="/Generate-Certificate">
                Generate Certificate
              </Link>
            </li>
            <li>
              <Link className="nav_link" to="/Validate-Certificate">
                Validate Certificate
              </Link>
            </li>
            
           
          </ul>
        </nav>
      </header>
    )
}
export default Navigation;
