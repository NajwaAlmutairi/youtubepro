import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Navbar from '../component/Navbar';
import moment from 'moment';
import 'moment/locale/ar';
import { Link } from 'react-router-dom';

function Home() {
    const apiKey = "AIzaSyAnMQaVLL4Wk7hXoMcQd6T61ibnp3sFhYo";
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=SA&videoCategoryId=0&key=${apiKey}`
    const [data, setData] = useState([])
    const [datastate,setDatastate]=useState(false);

    useEffect(() => {
        axios.get(apiUrl)
            .then(function (response) {
                console.log(response);
                setData(response.data.items);
                setDatastate(true);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])


    const viewsValue = (number) => {
        if (number >= 1000000) {
            return Math.floor(number / 1000000) + ' مليون مشاهدة ';
        } else if (number >= 1000) {
            return Math.floor(number / 1000) + ' ألف مشاهدة ';
        } else {
            return number;
        }
    }
    const getRelativeTime = (date) => {
        moment.locale('sa');
        return moment(date).fromNow();
    };

    return (
        <>
            <div className='flex flex-col'>
                <Navbar />
                <div className='flex justify-center items-center w-ful pt-16'>
                    <div className='flex justify-start  flex-wrap gap-4 pt-5 w-[90%] max-sm:w-[100%] max-sm:justify-evenly'>
                        {data.map((item, index) => {
                            return (
                                <Link to={`/watch/${item.snippet.categoryId}/${item.id}`} key={index} className='flex flex-col gap-2 w-[32%] max-sm:w-[47%] p-2'>
                                    <div className='w-full h-48 max-sm:h-32 rounded-lg bg-slate-400'>
                                        <img src={item.snippet.thumbnails.medium.url}
                                            alt="video image"
                                            className='rounded-lg w-full h-full' />
                                    </div>
                                    <div className='flex gap-2'>
                                        <div>
                                            <div className='btn btn-circle focus:border-none active:border-none min-h-7 w-10 h-10 max-sm:h-7 max-sm:w-7'>
                                                user
                                            </div>
                                        </div>
                                        <div className='flex flex-col w-[83%] '>
                                            <h2 className='text-[#0f0f0f] text-[1rem] max-sm:text-xs '>{item.snippet.title}</h2>
                                            <h3 className='text-[#606060] text-sm max-sm:text-[0.60rem]'>{item.snippet.channelTitle}</h3>
                                            <p className='text-[#606060] text-sm max-sm:text-[0.60rem]'>{viewsValue(item.statistics.viewCount)}   •  {getRelativeTime(item.snippet.publishedAt)}</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
                {!datastate && 
                    <h1 className='text-center pt-60'> جاري التحميل ..... </h1>
                }
            </div>
        </>
    )
}

export default Home