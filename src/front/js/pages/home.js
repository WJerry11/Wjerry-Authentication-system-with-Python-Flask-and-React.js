import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	function handleLogout() {
		actions.logout();
	}

	useEffect(() => {
		actions.getMessage();
	})

	return (
		<div className="text-center mt-5">
			<h1>{store.message}</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
				<div>
					{!store.token ?
						<Link to="/login">
							<button className="btn btn-success">login</button>
						</Link>
						:
						<button onClick={handleLogout} className="btn btn-warning">Logout</button>
					}
				</div>
			</p>
		</div>
	);
};
