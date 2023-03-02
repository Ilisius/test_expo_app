import React from "react";
import { SvgXml } from "react-native-svg";
import star from "../../assets/star.svg";

interface Props {
  color: string;
  width: string;
}

class SvgStar extends React.Component<Props, {}> {
  render(): React.ReactNode {
    return (
      <SvgXml
        xml={star}
        color={this.props.color}
        width={this.props.width}
        height={this.props.width}
      ></SvgXml>
    );
  }
}

export default SvgStar;
