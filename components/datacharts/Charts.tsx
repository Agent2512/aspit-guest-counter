import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { InputField } from "../InputField"
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Charts() {
    const locations = ["odense", "næstved", "all"] as const;
    const formats = ["day", "year"] as const;
    const [dates, setDates] = useState<string[]>([""]);

    const [location, setLocation] = useState<typeof locations[number]>(locations[2])
    const [format, setFormat] = useState<typeof formats[number]>(formats[1])
    const [date, setDate] = useState<typeof dates[number]>(dates[0])


    const [data, setData] = useState()


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
                api.data && setData(api.data)
            }
            else console.log(api);
        })
    }, [format, location, date])



    const series: { name: string, data: number[] }[] = [
        {
            name: 'guests',
            data: [31, 40, 28, 51, 42, 109, 100]
        }, {
            name: 'students',
            data: [11, 32, 45, 32, 34, 52, 41]
        }
    ]

    const options: ApexCharts.ApexOptions = {
        chart: {
            type: "area",
            background: "#3f9e8a"
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: "smooth"
        },
        xaxis: {
            type: "datetime",
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
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