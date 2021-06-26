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


    useEffect(() => {
        if (format != "year") {
            useApi("table/getDates", { location }).then(api => {
                if (api.type == "success") {
                    setDates(api.dates)
                }
                else console.log(api);
            })
        }
    }, [format, location])

    useEffect(() => {
        setDate(dates[0])
    }, [dates])

    useEffect(() => {
        useApi("table/get", { format, location, date }).then(api => {
            if (api.type == "success") {
                // console.log("success", api.data);
                if (api.table) {
                    const table = api.table as { date: string, guests: number, students: number }[]
                    let xaxis: ApexXAxis = {
                        type: format == "year" ? "category" : "datetime",
                        categories: table.map(i => i.date)
                    }
                    let series: { name: string, data: number[] }[] = [
                        {
                            name: "guests",
                            data: table.map(i => i.guests)
                        },
                        {
                            name: "students",
                            data: table.map(i => i.students)
                        }
                    ]
                    setShow({ xaxis, series })
                }
            }
            // console.log(api);
        })
    }, [format, location, date])

    console.log(show);
    

    const series: { name: string, data: number[] }[]|undefined = show?.series

    const options: ApexCharts.ApexOptions = {
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
        xaxis: show?.xaxis,
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

    return (
        <div className="charts">
            <div className="inputs">
                <select name="locations" value={location} onChange={e => locations.forEach((i) => i == e.currentTarget.value && setLocation(e.currentTarget.value))} >
                    {locations.map(i => <option key={i} value={i} >{i}</option>)}
                </select>
                <select name="formats" value={format} onChange={e => formats.forEach((i) => i == e.currentTarget.value && setFormat(e.currentTarget.value))} >
                    {formats.map(i => <option key={i} value={i} >{i}</option>)}
                </select>
                {format != "year" && <select name="date" value={date} onChange={e => dates.forEach((i) => i == e.currentTarget.value && setDate(e.currentTarget.value))} >
                    {dates.map(i => <option key={i} value={i} >{i == "no dates" ? i : new Date(i).toLocaleDateString()}</option>)}
                </select>}
            </div>

            <Chart type="area" height={350} series={series} options={options} />
        </div>
    )
}