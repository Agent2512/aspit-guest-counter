import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useState } from 'react';
import { useApi } from '../../hooks/useApi';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Charts() {
    const locations = ["odense", "næstved", "all"] as const;
    const formats = ["day", "year"] as const;
    const [dates, setDates] = useState<string[]>([""]);

    const [location, setLocation] = useState<typeof locations[number]>(locations[2])
    const [format, setFormat] = useState<typeof formats[number]>(formats[1])
    const [date, setDate] = useState<typeof dates[number]>(dates[0])

    interface IShow {
        xaxis: ApexXAxis
        series: { name: string, data: number[] }[]
    }
    const [show, setShow] = useState<IShow>()

    // get all dates if not format != "year"
    useEffect(() => {
        if (format != "year") {
            useApi("table/getDates", { location }).then(api => {
                if (api.type == "success") {
                    let dates: string[] = []
                    if (Array.isArray(api.dates) == false) {
                        var result:string[] = Object.keys(api.dates).map(function (key) {
                            return Number(key), api.dates[key];
                        })
                        dates = result
                    } else dates = api.dates
                    setDates(dates)
                }
            })
        }
    }, [format, location])
    // sets date to last index in date array
    useEffect(() => {
        const index = dates.length - 1
        setDate(dates[index])
    }, [dates])

    useEffect(() => {
        console.log(format, location, date);
        
        useApi("table/get", { format, location, date }).then(api => {
            if (api.type = "success") {
                const dates: string[] | false = (api.dates as string[]).length == 0 ? false : api.dates
                const table: { guests: number, students: number }[] | false = (api.dates as string[]).length == 0 ? false : api.table

                if (dates && table) {
                    setShow({
                        xaxis: {
                            type: format == 'year' ? "category" : "datetime",
                            categories: dates.sort()
                        },
                        series: [
                            {
                                name: "guests",
                                data: table.map(i => i.guests)
                            },
                            {
                                name: "students",
                                data: table.map(i => i.students)
                            }
                        ]
                    })
                } else setShow({
                    xaxis: {},
                    series: []
                })
            }
        })

    }, [format, location, date])



    const series: { name: string, data: number[] }[] | undefined = show?.series || [
        {
            name: 'guests',
            data: [0, 0, 0, 0]
        }, {
            name: 'students',
            data: [0, 0, 0, 0]
        }
    ]

    const options: ApexCharts.ApexOptions = {
        xaxis: show?.xaxis,
        chart: {
            type: "area",
            background: "#3f9e8a",
            toolbar: {
                tools: {
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: false
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: "smooth"
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            }
        },
        colors: [
            "#ff0000",
            "#0000ff"
        ],
    }


    const ele = () => {
        if (format != "year") {
            try {
                return <select name="date" value={date} onChange={e => dates.forEach((i) => i == e.currentTarget.value && setDate(e.currentTarget.value))} >
                    {dates.map(i => <option key={i} value={i} >{i == "no dates" ? i : i}</option>)}
                </select>
            } catch (error) {
                return undefined
            }
        } else return undefined
    }


    return (
        <div className="charts">
            <div className="inputs">
                <select name="locations" value={location} onChange={e => locations.forEach((i) => i == e.currentTarget.value && setLocation(e.currentTarget.value))} >
                    {locations.map(i => <option key={i} value={i} >{i}</option>)}
                </select>
                <select name="formats" value={format} onChange={e => formats.forEach((i) => i == e.currentTarget.value && setFormat(e.currentTarget.value))} >
                    {formats.map(i => <option key={i} value={i} >{i}</option>)}
                </select>
                {format != "year"&&<select name="date" value={date} onChange={e => dates.forEach((i) => i == e.currentTarget.value && setDate(e.currentTarget.value))} >
                    {dates.map(i => <option key={i} value={i} >{i == "no dates" ? i : i}</option>)}
                </select>}
            </div>

            <Chart key={JSON.stringify(show)} type="area" height={350} series={series} options={options} />
        </div>
    )
}