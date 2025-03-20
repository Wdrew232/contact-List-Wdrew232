import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { string } from "prop-types";

export const Navbar = () => {
 const { store, dispatch } = useGlobalReducer();
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/submit">
						<button onClick={()=>
							{	let emptyContact = {
								name:"",
								email:"",
								phone:"",
								address:""
							}
								dispatch({type:"set-single-contact", payload:emptyContact})
							}
						} className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};