import React from 'react'

function SidebarElem({ image, text, icon }) {
    return (
        <>
            <li className='hover:bg-[#f2f2f2] px-4 py-2 max-sm:p-0 max-sm:m-0 rounded-[0.5rem] w-full cursor-pointer' >
                <span className='hover:bg-[#f2f2f2] '>
                    <div className="tooltip tooltip-bottom [--tooltip-color:#ffffff] [--tooltip-text-color:#000000] 
                  max-sm:py-1 max-sm:px-2 "
                        data-tip={text}>
                        <div className='flex gap-4 items-center w-full max-sm:gap-2  '>
                            <div>
                                {image && <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                    <path d={image}></path>
                                </svg>}
                                {icon && icon}
                            </div>
                            <div className='text-[#0f0f0f] max-sm:text-[0.75rem] '>{text}</div>
                        </div>
                    </div>
                </span>
            </li>
        </>
    )
}

export default SidebarElem
