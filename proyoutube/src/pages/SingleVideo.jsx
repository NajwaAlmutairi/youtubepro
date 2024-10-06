import React from 'react'
import Navbar from '../component/Navbar';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { faShare, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import 'moment/locale/ar';
import { useNavigate } from 'react-router-dom';



function SingleVideo() {

    let { id, catId } = useParams();
    const [isComment, setIsComment] = useState(false);
    const [comment, setComment] = useState();
    const [singleVideo, setSingleVideo] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);
    const [recommendedData, setRecommendedData] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [truncatedDescription, setTruncatedDescription] = useState();
    const navigate = useNavigate();

    const apiKey = "AIzaSyAnMQaVLL4Wk7hXoMcQd6T61ibnp3sFhYo";
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${apiKey}`
    const apiUrlComment = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${id}&key=${apiKey}`;
    const apiUrlrecommended = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=SA&videoCategoryId=${catId}&key=${apiKey}`

    useEffect(() => {
        axios.get(apiUrl)
            .then(function (response) {
                setSingleVideo(response.data.items[0])
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [id])

    useEffect(() => {
        axios.get(apiUrlComment)
            .then(function (response) {
                console.log("the comment data");
                console.log(response.data.items);
                setCommentData(response.data.items)
                console.log("commentData");

                console.log(commentData);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [singleVideo])

    useEffect(() => {
        if (singleVideo) {
            const apiUrlChannel = `https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${singleVideo.snippet.channelId}&key=${apiKey}`;
            axios.get(apiUrlChannel)
                .then(function (response) {
                    setChannelData(response.data.items[0])
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }, [singleVideo])

    useEffect(() => {
        axios.get(apiUrlrecommended)
            .then(function (response) {
                console.log(response);
                setRecommendedData(response.data.items)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])


    const likesValue = (number) => {
        if (number >= 1000000) {
            return Math.floor(number / 1000000) + ' مليون  ';
        } else if (number >= 1000) {
            return Math.floor(number / 1000) + ' ألف  ';
        } else {
            return number;
        }
    }
    const getRelativeTime = (date) => {
        moment.locale('sa');
        return moment(date).fromNow();
    };


    useEffect(() => {
        if (singleVideo) {
            const truncatedDescription = isExpanded ?
                singleVideo.snippet.description : singleVideo.snippet.description.slice(0, 100) + '...';
            setTruncatedDescription(truncatedDescription);
        }
    }, [singleVideo, isExpanded])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [singleVideo]);

    useEffect(() => {
        if (!localStorage.getItem('username')) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <>
            <div className='flex flex-col'>
                <Navbar />
                {singleVideo &&
                    <div className='flex w-full justify-center items-center pt-20'>
                        <div className='flex w-[90%] gap-4 max-sm:flex-col max-sm:w-[96%] max-sm:justify-center'>
                            <div className='flex flex-col w-[55%] gap-2 order-1 max-sm:order-1 max-sm:w-full'>
                                <iframe
                                    className='w-full h-[63vh] rounded-xl max-sm:h-[40vh]'
                                    src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                                    allow="accelerometer; autoplay; clipboard-write; 
                                     encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
                                </iframe>
                                <h1 className='font-bold text-[#0f0f0f] text-xl w-[85%] max-sm:text-base'>
                                    {singleVideo.snippet.title}
                                </h1>
                                <div className='flex justify-between items-cente max-sm:flex-col max-sm:justify-start max-sm:items-start max-sm:gap-2 max-sm:pr-1'>
                                    <div className='flex justify-between w-[47%]  max-sm:gap-4 max-sm:justify-start max-sm:w-full' >
                                        <div className='flex gap-2'>
                                            <div className='btn btn-circle bg-red-400 hover:bg-red-400 focus:border-none active:border-none w-10 h-10 min-h-7 max-sm:h-7 max-sm:w-7'>
                                                {channelData && <img src={channelData.snippet.thumbnails.default.url}
                                                    className='rounded-full h-10 w-10' />}
                                            </div>
                                            <div className='flex flex-col w-[83%] '>
                                                <h3 className='text-[#0f0f0f] text-sm max-sm:text-[0.60rem]'> {singleVideo.snippet.channelTitle}</h3>
                                                <p className='text-[#606060] text-sm max-sm:text-[0.60rem]'>{channelData && likesValue(channelData.statistics.viewCount)}  مشترك </p>
                                            </div>
                                        </div>
                                        <div className='bg-pink-50 flex justify-center items-center'>
                                            <button className='btn btn-circle bg-black text-white min-h-7 w-16 h-9 hover:bg-[#272727] max-sm:text-xs max-sm:w-14'>
                                                أشتراك
                                            </button>
                                        </div>
                                    </div>
                                    <div className='flex justify-between w-[52%] max-sm:w-full max-sm:px-4'>
                                        <div className="join min-h-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200">
                                            <button className="btn join-item text-black text-sm max-sm:text-xs font-normal min-h-9 h-9 ">
                                                < svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" >
                                                    <path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z">
                                                    </path>
                                                </svg >
                                                {likesValue(singleVideo.statistics.likeCount)}
                                            </button>
                                            <hr />
                                            <button className="btn join-item min-h-9 h-9 ">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                                    <path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z">
                                                    </path>
                                                </svg>
                                            </button>
                                        </div>
                                        <button className='btn btn-circle bg-neutral-100 text-sm font-normal  text-black min-h-7 w-[5.5rem] h-9 flex justify-center items-center hover:bg-neutral-200'>
                                            <FontAwesomeIcon icon={faShare} className='text-black text-sm max-sm:text-xs' />
                                            مشاركة
                                        </button>

                                        <button className='btn btn-circle bg-neutral-200  text-black  min-h-7 w-9 h-9 flex justify-center items-center '>
                                            <FontAwesomeIcon icon={faEllipsis} />
                                        </button>
                                    </div>
                                </div>

                                <div className='w-full text-[#0f0f0f] bg-[#f2f2f2] rounded-xl p-2 mb-3 overflow-hidden max-sm:text-xs'>
                                    <div className='flex flex-col gap-3'>
                                        <p>
                                            {truncatedDescription}
                                        </p>
                                    </div>
                                    <button
                                        className='mt-2 hover:underline'
                                        onClick={() => setIsExpanded(!isExpanded)}
                                    >
                                        {isExpanded ? 'عرض محتوى أقل' : '...المزيد '}
                                    </button>
                                </div>

                                <div className=' hidden md:flex flex-col w-full gap-2'>
                                    <div className='flex gap-4 w-full pb-3'>
                                        <h1 className='font-bold text-black text-lg max-sm:text-base'> {singleVideo.statistics.commentCount} تعليقًا</h1>
                                        <p className='flex gap-2 items-center text-[#0f0f0f] max-sm:text-sm'>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M4 6h16M4 12h16M4 18h7" />
                                            </svg>
                                            الترتيب حسب
                                        </p>
                                    </div>
                                    <div className='flex gap-4 pb-5'>
                                        <div className='btn btn-circle border-none bg-red-400 hover:bg-red-400 focus:border-none active:border-none w-10 h-10 min-h-7 max-sm:h-7 max-sm:w-7'>
                                            User
                                        </div>
                                        <div className='flex flex-col gap-1 w-full'>
                                            <textarea
                                                onClick={() => { setIsComment(true) }}
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                placeholder="إضافة تعليق"
                                                className="border-b text-slate-500 border-black bg-transparent resize-none h-7 w-full outline-none p-0 text-sm focus:border-b-2"
                                            ></textarea>
                                            {isComment &&
                                                <div className='flex justify-between'>
                                                    <button className="btn btn-ghost btn-circle min-h-10 w-10 h-10 hover:bg-neutral-200">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" >
                                                            <path d="M15.83 15c-.52 1.38-2.19 2-3.79 2-1.59 0-3.28-.62-3.85-2h7.64m.69-1H7.49c-.27 0-.49.22-.46.47C7.34 16.83 9.7 18 12.05 18c2.35 0 4.69-1.18 4.93-3.54.03-.25-.2-.46-.46-.46zM12 3c4.96 0 9 4.04 9 9s-4.04 9-9 9-9-4.04-9-9 4.04-9 9-9m0-1C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM6.94 9.73C7.19 9.25 7.72 9 8.5 9c.75 0 1.28.25 1.57.75.14.24.45.32.68.18.24-.14.32-.44.18-.68C10.6 8.68 9.91 8 8.5 8c-1.48 0-2.15.69-2.44 1.27-.13.25-.03.55.21.67.07.04.15.06.23.06.18 0 .36-.1.44-.27zm7 0c.25-.48.78-.73 1.56-.73.75 0 1.28.25 1.57.75.14.24.45.32.68.18.24-.14.32-.44.18-.68C17.6 8.68 16.91 8 15.5 8c-1.48 0-2.15.69-2.44 1.27-.13.25-.03.55.21.67.07.04.15.06.23.06.18 0 .36-.1.44-.27z"></path>
                                                        </svg>
                                                    </button>
                                                    <div className='flex gap-2'>
                                                        <button onClick={() => {
                                                            setIsComment(false);
                                                            setComment('')
                                                        }}
                                                            className='btn btn-ghost btn-circle text-sm font-normal  text-black min-h-7 w-12 h-9 hover:bg-neutral-200'>
                                                            إلغاء
                                                        </button>
                                                        <button className={`btn btn-circle ${comment ? '' : 'btn-disabled'} bg-neutral-200 text-sm font-normal  text-black min-h-7 w-14 h-9`}>
                                                            تعليق
                                                        </button>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    {commentData &&
                                        commentData.map((item, index) => {
                                            return (
                                                <div key={index} className='flex gap-2 '>
                                                    <div>
                                                        <div className='btn btn-circle border-none bg-red-400 hover:bg-red-400 focus:border-none active:border-none w-10 h-10 min-h-7 max-sm:h-7 max-sm:w-7'>
                                                            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="user"
                                                                className='rounded-full w-10 h-10 ' />
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-col w-[83%] '>
                                                        <h3 className='text-[#0f0f0f] text-sm max-sm:text-[0.60rem]'> <span className='text-[#606060] text-xs'> {getRelativeTime(item.snippet.topLevelComment.snippet.publishedAt)}</span> {item.snippet.topLevelComment.snippet.authorDisplayName} </h3>
                                                        <p className='text-[#0f0f0f] text-[.9rem] max-sm:text-xs break-words '>{item.snippet.topLevelComment.snippet.textDisplay} </p>
                                                        <div className='flex gap-2'>
                                                            <div className='flex items-center'>
                                                                <button className="btn btn-ghost btn-circle min-h-10 w-10 h-10 hover:bg-neutral-200">
                                                                    < svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" >
                                                                        <path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z">
                                                                        </path>
                                                                    </svg >
                                                                </button>
                                                                <p className='text-sm max-sm:text-xs text-[#606060]'>{likesValue(item.snippet.topLevelComment.snippet.likeCount)}</p>
                                                            </div>
                                                            <button className="btn btn-ghost btn-circle min-h-10 w-10 h-10 hover:bg-neutral-200">
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                                                    <path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z">
                                                                    </path>
                                                                </svg>
                                                            </button>
                                                            <button className="btn btn-ghost btn-circle min-h-10 w-10 h-10 hover:bg-neutral-200 pb-1">
                                                                <h1>رد</h1>
                                                            </button>

                                                        </div>
                                                    </div>
                                                    <div className="dropdown dropdown-end">
                                                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle min-h-10 w-10 h-10 active:bg-neutral-200  m-1 bg-transparent border-transparent hover:bg-transparent ">
                                                            < svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" >
                                                                <path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path>
                                                            </svg >
                                                        </div>
                                                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-28 p-2 shadow">
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
                                            );
                                        })}

                                </div>
                            </div>
                            <div className='w-[43%] flex flex-col gap-4 order-2 max-sm:order-2 max-sm:w-full'>
                                {recommendedData.map((item, index) => {
                                    return (
                                        <Link to={`/watch/${item.snippet.categoryId}/${item.id}`} key={index} className='flex gap-2 w-full '>
                                            <div className='w-[23vw] h-[5.9rem] rounded-lg relative'>
                                                <img src={item.snippet.thumbnails.medium.url} alt="" className='w-[100%] h-[100%] rounded-lg' />
                                                <div className='absolute bottom-0 left-0 text-white bg-[rgba(0,0,0,0.4)] px-1'>
                                                    16:36
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-2 w-full'>
                                                <div className='flex justify-between w-[95%]'>
                                                    <h3 className='text-[#0f0f0f] text-sm max-sm:text-[0.60rem]'> {item.snippet.title} </h3>
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
                                                <h3 className='text-[#606060] text-xs max-sm:text-[0.55rem]'>{item.snippet.channelTitle}</h3>
                                                <p className='text-[#606060] text-xs max-sm:text-[0.55rem]'>{likesValue(item.statistics.viewCount)} مشاهدة </p>
                                            </div>
                                        </Link>
                                    )

                                })}

                            </div>
                            <div className='flex md:hidden flex-col w-full gap-2 order-3'>
                                    <div className='flex gap-4 w-full pb-3'>
                                        <h1 className='font-bold text-black text-lg max-sm:text-base'> {singleVideo.statistics.commentCount} تعليقًا</h1>
                                        <p className='flex gap-2 items-center text-[#0f0f0f] max-sm:text-sm'>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M4 6h16M4 12h16M4 18h7" />
                                            </svg>
                                            الترتيب حسب
                                        </p>
                                    </div>
                                    <div className='flex gap-4 pb-5'>
                                        <div className='btn btn-circle border-none bg-red-400 hover:bg-red-400 focus:border-none active:border-none w-10 h-10 min-h-7 max-sm:h-7 max-sm:w-7'>
                                            User
                                        </div>
                                        <div className='flex flex-col gap-1 w-full'>
                                            <textarea
                                                onClick={() => { setIsComment(true) }}
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                placeholder="إضافة تعليق"
                                                className="border-b text-slate-500 border-black bg-transparent resize-none h-7 w-full outline-none p-0 text-sm focus:border-b-2"
                                            ></textarea>
                                            {isComment &&
                                                <div className='flex justify-between'>
                                                    <button className="btn btn-ghost btn-circle min-h-10 w-10 h-10 hover:bg-neutral-200">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" >
                                                            <path d="M15.83 15c-.52 1.38-2.19 2-3.79 2-1.59 0-3.28-.62-3.85-2h7.64m.69-1H7.49c-.27 0-.49.22-.46.47C7.34 16.83 9.7 18 12.05 18c2.35 0 4.69-1.18 4.93-3.54.03-.25-.2-.46-.46-.46zM12 3c4.96 0 9 4.04 9 9s-4.04 9-9 9-9-4.04-9-9 4.04-9 9-9m0-1C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM6.94 9.73C7.19 9.25 7.72 9 8.5 9c.75 0 1.28.25 1.57.75.14.24.45.32.68.18.24-.14.32-.44.18-.68C10.6 8.68 9.91 8 8.5 8c-1.48 0-2.15.69-2.44 1.27-.13.25-.03.55.21.67.07.04.15.06.23.06.18 0 .36-.1.44-.27zm7 0c.25-.48.78-.73 1.56-.73.75 0 1.28.25 1.57.75.14.24.45.32.68.18.24-.14.32-.44.18-.68C17.6 8.68 16.91 8 15.5 8c-1.48 0-2.15.69-2.44 1.27-.13.25-.03.55.21.67.07.04.15.06.23.06.18 0 .36-.1.44-.27z"></path>
                                                        </svg>
                                                    </button>
                                                    <div className='flex gap-2'>
                                                        <button onClick={() => {
                                                            setIsComment(false);
                                                            setComment('')
                                                        }}
                                                            className='btn btn-ghost btn-circle text-sm font-normal  text-black min-h-7 w-12 h-9 hover:bg-neutral-200'>
                                                            إلغاء
                                                        </button>
                                                        <button className={`btn btn-circle ${comment ? '' : 'btn-disabled'} bg-neutral-200 text-sm font-normal  text-black min-h-7 w-14 h-9`}>
                                                            تعليق
                                                        </button>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    {commentData &&
                                        commentData.map((item, index) => {
                                            return (
                                                <div key={index} className='flex gap-2 '>
                                                    <div>
                                                        <div className='btn btn-circle border-none bg-red-400 hover:bg-red-400 focus:border-none active:border-none w-10 h-10 min-h-7 max-sm:h-7 max-sm:w-7'>
                                                            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="user"
                                                                className='rounded-full w-10 h-10 ' />
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-col w-[83%] '>
                                                        <h3 className='text-[#0f0f0f] text-sm max-sm:text-[0.60rem]'> <span className='text-[#606060] text-xs'> {getRelativeTime(item.snippet.topLevelComment.snippet.publishedAt)}</span> {item.snippet.topLevelComment.snippet.authorDisplayName} </h3>
                                                        <p className='text-[#0f0f0f] text-[.9rem] max-sm:text-xs break-words '>{item.snippet.topLevelComment.snippet.textDisplay} </p>
                                                        <div className='flex gap-2'>
                                                            <div className='flex items-center'>
                                                                <button className="btn btn-ghost btn-circle min-h-10 w-10 h-10 hover:bg-neutral-200">
                                                                    < svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" >
                                                                        <path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z">
                                                                        </path>
                                                                    </svg >
                                                                </button>
                                                                <p className='text-sm max-sm:text-xs text-[#606060]'>{likesValue(item.snippet.topLevelComment.snippet.likeCount)}</p>
                                                            </div>
                                                            <button className="btn btn-ghost btn-circle min-h-10 w-10 h-10 hover:bg-neutral-200">
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                                                    <path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z">
                                                                    </path>
                                                                </svg>
                                                            </button>
                                                            <button className="btn btn-ghost btn-circle min-h-10 w-10 h-10 hover:bg-neutral-200 pb-1">
                                                                <h1>رد</h1>
                                                            </button>

                                                        </div>
                                                    </div>
                                                    <div className="dropdown dropdown-end">
                                                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle min-h-10 w-10 h-10 active:bg-neutral-200  m-1 bg-transparent border-transparent hover:bg-transparent ">
                                                            < svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" >
                                                                <path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path>
                                                            </svg >
                                                        </div>
                                                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-28 p-2 shadow">
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
                                            );
                                        })}

                                </div>
                        </div>
                    </div>
                }

                {!singleVideo && 
                    <h1 className='text-center pt-60'> جاري التحميل ..... </h1>
                }
            </div>

        </>
    )
}

export default SingleVideo