import React from 'react'
import { useState, useEffect } from 'react'
import logo from '../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Navbar() {
    const [fullSearch, setFullSearch] = useState(false);
    const navigate = useNavigate();
    const [searchedv, setSearchedv] = useState(); 

    useEffect(() => {
        const handleResize = () => {
            const widthThreshold = 450;
            if (window.innerWidth > widthThreshold) {
                setFullSearch(false);
            }
        };
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleSearch = () => { 
        if (searchedv) { 
          navigate(`/search/${searchedv}`); 
        } 
      };


    return (
        <>
            {!fullSearch &&
                <div className="navbar p-0 px-4 min-h-16 h-16 max-sm:px-0 bg-white fixed z-50">
                    <div className="navbar-start gap-4  max-sm:gap-1">
                        <div >
                            <Sidebar />
                        </div>

                        <Link to={'/home'}>
                            <img src={logo} alt="logo" className='h-6' />
                        </Link>
                    </div>
                    <div className="navbar-center gap-4 hidden md:flex justify-center">
                        <div className="join">
                            <div className="flex flex-grow max-w-[48vw]">
                                <input
                                    type="text"
                                    value={searchedv}
                                    placeholder="بحث"
                                    onChange={(e) => setSearchedv(e.target.value)}
                                    className="input join-item rounded-r-full text-[1rem] h-11 
                                    w-[48vw]  outline-none focus:border-blue-400 shadow-inner shadow-neutral-200 border border-neutral-400 focus:outline-none"
                                />
                                <button onClick={handleSearch} className="btn join-item rounded-l-full min-h-9 h-11  border border-neutral-400 bg-neutral-100 hover:bg-neutral-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                        <path d="M16.296 16.996a8 8 0 11.707-.708l3.909 3.91-.707.707-3.909-3.909zM18 11a7 7 0 00-14 0 7 7 0 1014 0z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <button className="btn btn-circle min-h-10 w-10 h-10 bg-neutral-200 hover:bg-neutral-300">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                <path d="M12 3c-1.66 0-3 1.37-3 3.07v5.86c0 1.7 1.34 3.07 3 3.07s3-1.37 3-3.07V6.07C15 4.37 13.66 3 12 3zm6.5 9h-1c0 3.03-2.47 5.5-5.5 5.5S6.5 15.03 6.5 12h-1c0 3.24 2.39 5.93 5.5 6.41V21h2v-2.59c3.11-.48 5.5-3.17 5.5-6.41z"></path>
                            </svg>
                        </button>

                    </div>
                    <div className="navbar-end flex gap-1 max-sm:gap-0 max-sm:justify-start">
                        <button onClick={() => setFullSearch(true)} className="btn btn-ghost flex md:hidden btn-circle min-h-10 w-10 h-10 hover:bg-neutral-200">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                <path d="M16.296 16.996a8 8 0 11.707-.708l3.909 3.91-.707.707-3.909-3.909zM18 11a7 7 0 00-14 0 7 7 0 1014 0z"></path>
                            </svg>
                        </button>
                        <button className="btn btn-ghost flex md:hidden btn-circle min-h-10 w-10 h-10 hover:bg-neutral-200">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                <path d="M12 3c-1.66 0-3 1.37-3 3.07v5.86c0 1.7 1.34 3.07 3 3.07s3-1.37 3-3.07V6.07C15 4.37 13.66 3 12 3zm6.5 9h-1c0 3.03-2.47 5.5-5.5 5.5S6.5 15.03 6.5 12h-1c0 3.24 2.39 5.93 5.5 6.41V21h2v-2.59c3.11-.48 5.5-3.17 5.5-6.41z"></path>
                            </svg>
                        </button>
                        <button className="btn btn-ghost btn-circle min-h-10 w-10 h-10 hover:bg-neutral-200">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                <path d="M14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2zm3-7H3v12h14v-6.39l4 1.83V8.56l-4 1.83V6m1-1v3.83L22 7v8l-4-1.83V19H2V5h16z"></path>
                            </svg>
                        </button>
                        <button className="btn btn-ghost btn-circle min-h-10 w-10 h-10 hover:bg-neutral-200">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" >
                                    <path d="M10 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm10-2.65V19H4v-1.65l2-1.88v-5.15C6 7.4 7.56 5.1 10 4.34v-.38c0-1.42 1.49-2.5 2.99-1.76.65.32 1.01 1.03 1.01 1.76v.39c2.44.75 4 3.06 4 5.98v5.15l2 1.87zm-1 .42-2-1.88v-5.47c0-2.47-1.19-4.36-3.13-5.1-1.26-.53-2.64-.5-3.84.03C8.15 6.11 7 7.99 7 10.42v5.47l-2 1.88V18h14v-.23z"></path>
                                </svg>
                                <span className="badge badge-xs bg-[#c1121f] indicator-item"></span>
                            </div>
                        </button>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn m-1  btn-circle min-h-10 w-10 h-10 bg-neutral-200 hover:bg-neutral-300">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <ul tabIndex={0} className="dropdown-content bg-base-100 rounded-box z-[1] w-36 p-2 py-4 px-6 shadow">
                                <li><a className='text-red-500 text-lg w-full hover:underline cursor-pointer' onClick={()=>{localStorage.removeItem('username'); navigate("/login");}} >Logout</a></li>
                            </ul>
                        </div>


                    </div>
                </div>
            }

            {fullSearch &&
                <div className="navbar bg-base-200 p-0 pb-2 pt-2 px-0 min-h-11 ">
                    <div className="navbar-start gap-4">
                        <button onClick={() => setFullSearch(false)} className="btn btn-ghost btn-circle min-h-10 w-10 h-10 hover:bg-neutral-200">
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </div>
                    <div className="navbar-center gap-4 ">
                        <div className="join">
                            <input
                                type="text"
                                value={searchedv}
                                placeholder="بحث"
                                onChange={(e) => setSearchedv(e.target.value)}
                                className="input join-item rounded-r-full text-lg
                                    w-[64vw] h-10 outline-none focus:border-blue-400 border border-neutral-400 focus:outline-none"
                            />
                            <button onClick={handleSearch} className="btn join-item rounded-l-full min-h-10 h-10 border border-neutral-400 bg-neutral-100 hover:bg-neutral-200">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                    <path d="M16.296 16.996a8 8 0 11.707-.708l3.909 3.91-.707.707-3.909-3.909zM18 11a7 7 0 00-14 0 7 7 0 1014 0z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="navbar-end">
                        <button className="btn btn-ghost btn-circle min-h-10 w-10 h-10 hover:bg-neutral-200">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                <path d="M12 3c-1.66 0-3 1.37-3 3.07v5.86c0 1.7 1.34 3.07 3 3.07s3-1.37 3-3.07V6.07C15 4.37 13.66 3 12 3zm6.5 9h-1c0 3.03-2.47 5.5-5.5 5.5S6.5 15.03 6.5 12h-1c0 3.24 2.39 5.93 5.5 6.41V21h2v-2.59c3.11-.48 5.5-3.17 5.5-6.41z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            }
        </>
    )
}

export default Navbar