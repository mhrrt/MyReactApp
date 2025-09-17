import React from "react";
import { View, Dimensions } from "react-native";
import Svg, { Circle, Line, Text } from "react-native-svg";

const { width } = Dimensions.get("window");
const size = width - 40;
const radius = size / 2;
const center = size / 2;

interface ChaughadhyaCircleProps {
  interval: number; // in minutes
  chaughadhyaArray: string[]; // e.g., ["Amrit", "Kaal", "Shubh", "Rog"...]
}

const ChaughadhyaCircle: React.FC<ChaughadhyaCircleProps> = ({
  interval,
  chaughadhyaArray,
}) => {
  const totalMinutes = 12 * 60; // 12 hours = 720 minutes
  const totalSegments = totalMinutes / interval;

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Svg height={size} width={size}>
        {/* Outer Circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius - 10}
          stroke="black"
          strokeWidth="2"
          fill="none"
        />

        {/* Minute & Hour Ticks */}
        {[...Array(60)].map((_, i) => {
          const angle = (i * 360) / 60 - 90;
          const rad = (angle * Math.PI) / 180;

          const outerX = center + (radius - 10) * Math.cos(rad);
          const outerY = center + (radius - 10) * Math.sin(rad);

          const innerX =
            center +
            (radius - (i % 5 === 0 ? 20 : 15)) * Math.cos(rad); // longer for 5-min multiples
          const innerY =
            center +
            (radius - (i % 5 === 0 ? 20 : 15)) * Math.sin(rad);

          return (
            <Line
              key={i}
              x1={innerX}
              y1={innerY}
              x2={outerX}
              y2={outerY}
              stroke="black"
              strokeWidth={i % 5 === 0 ? 2 : 1}
            />
          );
        })}

        {/* Hour Labels */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 360) / 12 - 90;
          const rad = (angle * Math.PI) / 180;

          const x = center + (radius - 40) * Math.cos(rad);
          const y = center + (radius - 40) * Math.sin(rad);

          return (
            <Text
              key={i}
              x={x}
              y={y + 5}
              fontSize="14"
              fontWeight="bold"
              textAnchor="middle"
              fill="black"
            >
              {i === 0 ? 12 : i}
            </Text>
          );
        })}
      </Svg>
    </View>
  );
};

export default ChaughadhyaCircle;
