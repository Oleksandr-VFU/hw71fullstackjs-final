import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router'
import type { RootState } from '../../redux/store'
import { login, logout } from '../../redux/slices/authSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

  console.log('isLoggedIn', isLoggedIn)

  const handleLogin = () => {
    dispatch(login())
  }
  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item">
          <NavLink to="/" className="navbar__link">
            Головна
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className="navbar__link">
            Автомобілі
          </NavLink>
        </li>
        <li className="navbar__item">
          {isLoggedIn ? (
            <button className="navbar__button navbar__button--logout" onClick={handleLogout}>Вийти</button>
          ) : (
            <button className="navbar__button navbar__button--login" onClick={handleLogin}>Увійти</button>
          )}
        </li>
      </ul>
    </div>
  )
}

export default Navbar