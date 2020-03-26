import * as React from "react"
import { inject, observer } from "mobx-react"
import NativeVitalsHeader from "./NativeVitalsHeader"
import Colors from "../Theme/Colors"
import { AreaChart, LineChart, Line, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { toJS } from "mobx"
import CustomCommandButton from "../CustomCommands/CustomCommandButton"
import AppStyles from "../Theme/AppStyles"

const Styles = {
    container: {
        ...AppStyles.Layout.vbox,
        margin: 0,
        flex: 1,
    },

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

interface ChartProps {
    data: any
}

interface ChartState { }

@observer
class VitalsChart extends React.Component<ChartProps, ChartState> {
    render() {
        return (
            <React.Fragment>
                {/* ["#aee39a", "#154975", "#87a9fd", "#5941a3", "#8ae1f9", "#115e41", "#38f0ac", "#1fa198"] */}
            <ResponsiveContainer width="100%" aspect={3.5 / 3.0}>
                <LineChart data={this.props.data} margin={CHART_MARGINS}>
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="systemInactive" stroke="#aea39a" />
                    <Line type="monotone" dataKey="systemPurgable" stroke="#154975" />
                    <Line type="monotone" dataKey="systemActive" stroke="#87a9fd" />
                    <Line type="monotone" dataKey="appUsed" stroke="#FF0000" />
                    <Line type="monotone" dataKey="systemUsed" stroke="#8ae1f9" />
                    <Line type="monotone" dataKey="systemFree" stroke="#00FF00" />
                    <Line type="monotone" dataKey="systemWired" stroke="#38a0ac" />
                    <Line type="monotone" dataKey="systemTotal" stroke="#1fa198" />
                </LineChart>
            </ResponsiveContainer>
            </React.Fragment>
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

    pingMemory = () => {
        this.props.session.ui.sendCustomMessageWithArgs("pingMemory")
    }

    clearVitalsRecords = () => {
        this.props.session.clearVitalsRecords()
    }

    render() {
        const { vitals } = toJS(this.props.session)

        return (
            <div style={Styles.container as any}>
                <NativeVitalsHeader />
                <div style={{ flexDirection: "row" }}>
                    <VitalsChart data={vitals} />
                </div>
                <div style={{
                    marginLeft: "40px",
                    width: "100%",
                    height: "30px",
                }}>{`Snapshots Recorded: ${vitals.length}`}</div>
                <div style={Styles.buttonContainer as any}>
                    <div style={Styles.button as any} onClick={this.pingMemory} >Ping Memory</div>
                    <div style={Styles.button as any} onClick={this.clearVitalsRecords} >Clear</div>
                </div>
            </div>
        )
    }
}