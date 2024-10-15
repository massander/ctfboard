import { createFileRoute } from '@tanstack/react-router'

import React, { useState } from 'react'
import { Treemap, ResponsiveContainer, Text, Rectangle, Label } from 'recharts'


import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "~/components/ui/dialog"
import { cn } from '~/lib/utils'

export const Route = createFileRoute('/treemap')({
    component: () => <Component />,
})

const data = [
    {
        name: 'Web',
        children: [
            { name: 'Frontend Development', value: 30 },
            { name: 'Backend API', value: 20 },
            { name: 'Database Design', value: 15 },
        ],
    },
    {
        name: 'Reverse',
        children: [
            { name: 'Binary Analysis', value: 25 },
            { name: 'Disassembly', value: 20 },
            { name: 'Debugging', value: 15 },
        ],
    },
    {
        name: 'Crypto',
        children: [
            { name: 'Encryption Algorithms', value: 20 },
            { name: 'Key Management', value: 15 },
            { name: 'Blockchain', value: 25 },
        ],
    },
]

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE', '#00C49F']

const fillClasses = ['fill-lime-600', 'fill-orange-600', 'fill-blue-600', 'fill-rose-600', 'fill-yellow-600']

const CustomizedContent = (props) => {
    const { root, depth, x, y, width, height, index, colors, name, value } = props;
    if (depth === 2) {
        console.log(props)
    }

    var fillColor = 'fill-transparent'

    let px = 0, py = 0, h = 0, w = 0

    if (depth === 0) {
        px = x
        py = y
        h = height
        w = width
    }

    if (depth === 1) {
        // var stroke = 8
        // var border = 0
        // if (x === root.x) {
        //     border = stroke / 2
        // }

        px = x
        py = y

        h = height
        w = width
        // px = x + border
        // py = y + border

        // h = height - stroke
        // w = width - stroke
    }

    if (depth === 2) {
        var border = 4
        var offset = 0

        if (y === 0 || y === root.y) {
            offset = 32
        }

        // if (x !== root.x) {
        //     border = border * 2
        // }

        px = x + border
        py = y + border + offset

        h = height - border * 2 - offset
        w = width - border * 2

        fillColor = colors[Math.floor((root.index / root.children.length) * 6)]

    }





    // var stroke = 0
    // var strokeSafeZone = 0
    // if (depth > 1) {
    //     stroke = 4
    //     strokeSafeZone = stroke / 2
    // }

    // var offsetX = 0
    // if (depth === 2 && (x === 0 && x === root.x)) {
    //     offsetX = 4
    // }

    // var offsetY = 0
    // if (depth === 2 && (y === 0 || y === root.y)) {
    //     offsetY = 4
    // }




    return (
        <>
            <rect
                x={px}
                y={py}
                width={w}
                height={h}
                paintOrder="stroke fill"
                className={cn(
                    // { 'stroke-[4] stroke-white': depth === 2 },
                    { 'fill-neutral-500': depth === 1 },
                    // { "hover:stroke-rose-900 ": depth === 1 },
                    { "stroke-[8] hover:stroke-rose-900 hover:fill-rose-900/50": depth === 2 },
                    depth === 2 && fillColor,
                    // { 'stroke-[8] stroke-transparent hover:stroke-rose-900': depth === 1 },
                    { ' hover:fill-rose-900': depth === 1 },
                )}
            // rx={depth === 1 ? 15 : 0}
            // ry={depth === 1 ? 15 : 0}
            // onClick={
            //     () => alert(name)
            // }
            // onMouseOver={(e) => {
            //     console.log(e)
            // }}
            />
            {/* {depth === 2 ?
                <rect
                    x={x + strokeSafeZone}
                    y={y + offset + strokeSafeZone}
                    width={width}
                    height={height - offset}
                    paintOrder="fill"
                    className={cn(
                        "fill-transparent",
                        // { 'stroke-[4] stroke-transparent': depth === 2 },
                        { "hover:stroke-[4] hover:stroke-rose-900 hover:fill-rose-900/50 hover:z-10": depth === 2 },
                    )}
                /> : null
            } */}

            {depth === 1 ? (
                // Display category name
                <text
                    x={x + 10}
                    y={y + 22}
                    className="font-black text-sm fill-secondary-foreground"
                >
                    {name}
                </text>
            ) : null}



            {depth === 2 ? (
                <g className='fill-white text-sm font-bold'>
                    <text x={x + width / 2} y={y + height / 2 - 10} textAnchor="middle">
                        {name}
                    </text>
                    <text x={x + width / 2} y={y + height / 2 + 10} textAnchor="middle">
                        {value}
                    </text>
                </g>
            ) : null}
        </>
    )
}

export default function Component() {
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null)

    const handleClick = (_, node) => {
        if (node.depth === 2) {  // Only open modal for leaf nodes (actual tasks)
            setSelectedTask(node)
            setModalOpen(true)
        }
    }

    return (
        <div className=" h-svh w-svw overflow-hidden ">
            <ResponsiveContainer width="100%" height="100%" className={"p-5"}>
                <Treemap
                    data={data}
                    // dataKey="points"
                    // nameKey="title"
                    aspectRatio={4 / 3}
                    // stroke="#fff"
                    // fill="#8884d8"
                    content={<CustomizedContent colors={fillClasses} />}
                    // onClick={handleClick}
                    isAnimationActive={false}
                />
            </ResponsiveContainer>
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{"Task Title"}</DialogTitle>
                        <DialogDescription>
                            Category: {"Task Category"}
                            <br />
                            size: {1000}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        <p>Additional task details can be added here.</p>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}