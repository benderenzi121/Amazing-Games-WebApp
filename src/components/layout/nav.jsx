import React, { Fragment, useState } from "react";
import { Link, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Nav = ({ auth: { isAuthenticated, loading }, logout }) => {
    const [formData, setFormData] = useState({
        search: "",
    });

    const { search } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(search);
    };
    const authLinks = (
        <ul className="navbar-nav mr-auto">
            <li>
                <a onClick={logout} className="nav__text" href="#!">
                    Logout
                </a>
            </li>
            <li>
                <Link to="/orders" className="nav__text">
                    Orders/history
                </Link>
            </li>

            <li>
                <Link className="nav__text" to="/cart">
                    <i className="fas fa-shopping-cart"></i>
                </Link>
            </li>
        </ul>
    );

    return (
        <div className="row">
            <nav className="nav navbar navbar-expand-md navbar-dark">
                <div className="navbar-collapse collapse order-1 order-md-0 dual-collapse2">
                    {!loading && <Fragment>{isAuthenticated ? authLinks : null}</Fragment>}
                </div>

                <div className="navbar-collapse collapse w-100  dual-collapse2">
                    <ul className="navbar-nav ml-auto nav__right">
                        <li>
                            <Link to="/products" className="nav__text">
                                Products
                            </Link>
                        </li>
                        {/* <li>
                            <form onSubmit={onSubmit}>
                                <div className="nav__search">
                                    <input
                                        className="nav__search__input"
                                        type="text"
                                        placeholder="search"
                                        name="search"
                                        value={search}
                                        onChange={onChange}
                                    />
                                </div>
                            </form>
                        </li> */}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

Nav.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Nav);
