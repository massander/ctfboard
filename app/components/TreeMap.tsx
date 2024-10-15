"use client"

import React, { useState } from 'react'
import { Treemap, ResponsiveContainer } from 'recharts'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

const data = [
    {
        name: 'Web',
        children: [
            { name: 'Frontend Development', size: 30 },
            { name: 'Backend API', size: 20 },
            { name: 'Database Design', size: 15 },
        ],
    },
    {
        name: 'Reverse',
        children: [
            { name: 'Binary Analysis', size: 25 },
            { name: 'Disassembly', size: 20 },
            { name: 'Debugging', size: 15 },
        ],
    },
    {
        name: 'Crypto',
        children: [
            { name: 'Encryption Algorithms', size: 20 },
            { name: 'Key Management', size: 15 },
            { name: 'Blockchain', size: 25 },
        ],
    },
]

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE', '#00C49F']

const CustomizedContent = ({ root, depth, x, y, width, height, index, colors, name }) => {
    return (
        <g>
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                style={{
                    fill: depth < 2 ? colors[Math.floor((index / root.children.length) * 6)] : 'none',
                    stroke: '#fff',
                    strokeWidth: 2 / (depth + 1e-10),
                    strokeOpacity: 1 / (depth + 1e-10),
                }}
            />
            {depth === 1 ? (
                <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="#fff" fontSize={14}>
                    {name}
                </text>
            ) : null}
        </g>
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
        <div className="h-screen w-screen overflow-hidden bg-background">
            <ResponsiveContainer width="100%" height="100%">
                <Treemap
                    data={data}
                    dataKey="size"
                    aspectRatio={4 / 3}
                    stroke="#fff"
                    fill="#8884d8"
                    content={<CustomizedContent colors={COLORS} />}
                    onClick={handleClick}
                />
            </ResponsiveContainer>
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selectedTask?.name}</DialogTitle>
                        <DialogDescription>
                            Category: {selectedTask?.parent.name}
                            <br />
                            Points: {selectedTask?.value}
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