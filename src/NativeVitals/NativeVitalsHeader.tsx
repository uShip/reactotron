import { observer } from "mobx-react"
import * as React from "react"
import AppStyles from "../Theme/AppStyles"
import Colors from "../Theme/Colors"

const TITLE = "React Native Vitals"

const Styles = {
  container: {
    WebkitAppRegion: "drag",
    backgroundColor: Colors.backgroundSubtleLight,
    borderBottom: `1px solid ${Colors.chromeLine}`,
    color: Colors.foregroundDark,
    boxShadow: `0px 0px 30px ${Colors.glow}`,
  },
  content: {
    height: 70,
    paddingLeft: 10,
    paddingRight: 10,
    ...AppStyles.Layout.hbox,
    justifyContent: "space-between",
  },
  left: { ...AppStyles.Layout.hbox, width: 100, alignItems: "center" },
  right: { ...AppStyles.Layout.hbox, justifyContent: "flex-end", alignItems: "center", width: 100 },
  center: { ...AppStyles.Layout.vbox, flex: 1, alignItems: "center", justifyContent: "center" },
  title: { color: Colors.foregroundLight, textAlign: "center" },
}

interface Props { }

interface State { }

@observer
class CustomCommandListHeader extends React.Component<Props, State> {

  render() {
    return (
      <div style={Styles.container}>
        <div style={Styles.content as any}>
          <div style={Styles.left as any} />
          <div style={Styles.center as any}>
            <div style={Styles.title as any}>{TITLE}</div>
          </div>
          <div style={Styles.right as any}/>
        </div>
      </div>
    )
  }
}

export default CustomCommandListHeader
