import React from 'react'
import Navbar from '../component/Navbar';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ar';
import { useNavigate } from 'react-router-dom';
import SmallCard from '../component/smallCard';

function Search() {

    let { sv } = useParams();
    const navigate = useNavigate();
    const apiKey = "AIzaSyDZgtt87cHhpV_RaMdE1HSSAF78eUTv1Go";
    const [searchdata, setSearchdata] = useState([])

    const apiUrl = `https://www.googleapis.com/youtube/v3/search?&key=${apiKey}&q=${encodeURIComponent(sv)}&maxResults=15&type=video&part=snippet`;

    useEffect(() => {
        if (!sv) {
            console.error("Search term is empty");
            return;
        }
        axios
            .get(apiUrl)
            .then((response) => {
                console.log(response.data.items);
                setSearchdata(response.data.items);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [sv]);

    const likesValue = (number) => {
        if (number >= 1000000) {
            return Math.floor(number / 1000000) + ' مليون  ';
        } else if (number >= 1000) {
            return Math.floor(number / 1000) + ' ألف  ';
        } else {
            return number;
        }
    }
    useEffect(() => {
        if (!localStorage.getItem('username')) {
            navigate("/");
        }
    }, [navigate]);
    return (
        <>
            <div className='flex flex-col'>
                <Navbar />
                <div className='w-[60%] flex flex-col gap-4 mr-20 mt-20 max-sm:w-full max-sm:mr-2'>
                    {searchdata.map((item, index) => {
                        return (
                            <>
                                <SmallCard key={index}
                                    id={item.id.videoId}
                                    url={item.snippet.thumbnails.medium.url}
                                    title={item.snippet.title}
                                    channelTitle={item.snippet.channelTitle}
                                />
                            </>
                        )
                    })}
                </div>
                {/*  */}


            </div>

        </>
    )
}

export default Search


// {/* <SmallCard categoryId={item.snippet.categoryId} url={item.snippet.thumbnails.medium.url}
// title={item.snippet.title} channelTitle={item.snippet.channelTitle} viewCount={item.statistics.viewCount} /> */}