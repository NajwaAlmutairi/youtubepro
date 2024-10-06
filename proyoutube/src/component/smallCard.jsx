import React from 'react'
import { Link } from 'react-router-dom';

function SmallCard(props) {

    return (
        <>
            <div className='flex justify-between w-[95%]'>
                <Link to={`/watch/1/${props.id}`} className='flex gap-2 w-full '>
                    <div className='w-[23vw] h-[5.9rem] rounded-lg relative'>
                        <img src={props.url} alt="" className='w-[100%] h-[100%] rounded-lg' />
                        <div className='absolute bottom-0 left-0 text-white bg-[rgba(0,0,0,0.4)] px-1'>
                            16:36
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <div className='flex justify-between w-[95%]'>
                            <h3 className='text-[#0f0f0f] text-sm max-sm:text-[0.60rem]'> {props.title} </h3>
                        </div>
                        <h3 className='text-[#606060] text-xs max-sm:text-[0.55rem]'>{props.channelTitle}</h3>
                        {/* <p className='text-[#606060] text-xs max-sm:text-[0.55rem]'>{likesValue(props.viewCount)} مشاهدة </p> */}
                    </div>
                </Link>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle min-h-10 w-10 h-10 active:bg-neutral-200 bg-transparent border-transparent hover:bg-transparent ">
                        < svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" >
                            <path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path>
                        </svg >
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-72 p-2shadow">
                        <li><a className=' text-sm '>
                            < svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" >
                                <path d="M21 16h-7v-1h7v1zm0-5H9v1h12v-1zm0-4H3v1h18V7zm-11 8-7-4v8l7-4z">
                                </path></svg >
                            الإضافة إالى قائمة المحتوى التالي
                        </a></li>
                        <li><a className=' text-sm '>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                <path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM12 3c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0-1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z">
                                </path>
                            </svg>
                            الحفظ في قائمة "المشاهدة لاحقًا "
                        </a></li>
                        <li><a className=' text-sm '>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                <path d="M18 4v15.06l-5.42-3.87-.58-.42-.58.42L6 19.06V4h12m1-1H5v18l7-5 7 5V3z">
                                </path></svg>
                            حفظ في قائمة التشغيل
                        </a></li>
                        <li><a className=' text-sm '>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                <path d="M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z">
                                </path>
                            </svg>
                            تنزيل
                        </a></li>
                        <li><a className=' text-sm '>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                <path d="M15 5.63 20.66 12 15 18.37V14h-1c-3.96 0-7.14 1-9.75 3.09 1.84-4.07 5.11-6.4 9.89-7.1l.86-.13V5.63M14 3v6C6.22 10.13 3.11 15.33 2 21c2.78-3.97 6.44-6 12-6v6l8-9-8-9z">
                                </path>
                            </svg>
                            مشاركة
                        </a></li>
                        <hr />
                        <li><a className=' text-sm '>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zM3 12c0 2.31.87 4.41 2.29 6L18 5.29C16.41 3.87 14.31 3 12 3c-4.97 0-9 4.03-9 9zm15.71-6L6 18.71C7.59 20.13 9.69 21 12 21c4.97 0 9-4.03 9-9 0-2.31-.87-4.41-2.29-6z" fill-rule="evenodd">
                                </path>
                            </svg>
                            لا يهمني
                        </a></li>
                        <li><a className=' text-sm '>
                            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24">
                                <g>
                                    <path d="M12 3c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0-1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm7 11H5v-2h14v2z">
                                    </path>
                                </g></svg>
                            عدم اقتراح القناة
                        </a></li>
                        <li><a>
                            < svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" >
                                <path d="m13.18 4 .24 1.2.16.8H19v7h-5.18l-.24-1.2-.16-.8H6V4h7.18M14 3H5v18h1v-9h6.6l.4 2h7V5h-5.6L14 3z">
                                </path>
                            </svg >
                            إبلاغ
                        </a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default SmallCard