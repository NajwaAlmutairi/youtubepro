import React from 'react'

function CategoryBtn(props) {
    return (
        <>
            <button onClick={props.setCategory(props.catId)} className={`btu h-8 p-3 ${props.isActive? 'bg-black':'bg-neutral-200'} ${props.isActive? 'text-[white]':'text-[#0f0f0f]'}  `}>
                {props.text}
            </button>
        </>
    )
}

export default CategoryBtn