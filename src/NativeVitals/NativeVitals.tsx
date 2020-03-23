import * as React from "react"
import { inject, observer } from "mobx-react"
import NativeVitalsHeader from "./NativeVitalsHeader"
import Colors from "../Theme/Colors"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { toJS } from "mobx"
import CustomCommandButton from "../CustomCommands/CustomCommandButton"

const Styles = {
    container: {},

    chartContainer: {
        overflowY: "scroll",
        overflowX: "hidden",
        display: "flex",
        height: "100%",
    },

    chart: {
        backgroundColor: Colors.backgroundLighter,
        width: "100%",
        height: "100%",
    },

    button: {
      backgroundColor: Colors.backgroundLighter,
      borderRadius: "4px",
      minHeight: "50px",
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      width: "200px",
      marginTop: "18px",
      marginBottom: "24px",
      cursor: "pointer",
      color: "white",
      transition: "background-color 0.25s ease-in-out",
    },

    buttonContainer: {
        marginLeft: "40px",
    },
}

const CHART_MARGINS = {
    top: 30,
    right: 40,
    left: 20,
    bottom: 40,
}

const demoData = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
]

interface DemoProps {
    data: any
}

interface DemoState { }

@observer
class DemoChart extends React.Component<DemoProps,DemoState> {
    render() {
        console.log(`DemoChart`, demoData)
        let chartData = []

        var i
        for (i = 0; i < this.props.data.length; i++) { 
            if (i < demoData.length) {
                chartData.push(demoData[i])
            } else {
                chartData.push(demoData[0])
            }
            console.log("point")
        }

        return (
            <ResponsiveContainer width="100%" aspect={3.5 / 3.0}>
                <LineChart data={chartData} margin={CHART_MARGINS}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        )
    }
}

interface ChartProps {
    data: any
}

interface ChartState { }

@observer
class VitalsChart extends React.Component<ChartProps, ChartState> {
    render() {
        return (
            <ResponsiveContainer width="100%" aspect={3.5 / 3.0}>
                <LineChart data={this.props.data} margin={CHART_MARGINS}>
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="systemInactive" stroke="#FF0000" />
                    <Line type="monotone" dataKey="systemPurgable" stroke="#00FF00" />
                    <Line type="monotone" dataKey="systemActive" stroke="#0000FF" />
                    <Line type="monotone" dataKey="appUsed" stroke="#AA0000" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="systemUsed" stroke="#00AA00" />
                    <Line type="monotone" dataKey="systemFree" stroke="#0000AA" />
                    <Line type="monotone" dataKey="systemWired" stroke="#550000" />
                    <Line type="monotone" dataKey="systemTotal" stroke="#005500" />
                </LineChart>
            </ResponsiveContainer>
        )
    }
}

interface Props {
    session?: any
}

interface State { }

@inject("session")
@observer
export default class NativeVitalsView extends React.Component<Props, State> {
    state = {}

    executeCommand = () => {
        this.props.session.ui.sendCustomMessageWithArgs("pingMemory")
    }

    render() {
        const { vitals } = toJS(this.props.session)

        return (
            <div style={Styles.container as any}>
                <NativeVitalsHeader />
                { <VitalsChart data={vitals} />}
                <div style={{
                    marginLeft: "40px",
                    width: "100%",
                    height: "30px",
                }}>{`Points: ${vitals.length}`}</div>

                <div style={Styles.buttonContainer as any}>
                    <CustomCommandButton item={{
                        title: "Ping Memory",
                        command: "pingMemory",
                    }} onClick={this.executeCommand} />
                </div>
            </div>
        )
    }
}