//@ts-nocheck
import React from "react";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";

export const HomeLoader = (props) => (
  <ContentLoader
    speed={2}
    width={300}
    height={400}
    viewBox='0 0 300 400'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}
  >
    <Rect x='44' y='15' rx='0' ry='0' width='285' height='130' />
    <Rect x='44' y='195' rx='0' ry='0' width='279' height='18' />
    <Rect x='42' y='245' rx='0' ry='0' width='284' height='17' />
    <Rect x='55' y='293' rx='0' ry='0' width='267' height='17' />
    <Rect x='59' y='338' rx='0' ry='0' width='137' height='21' />
    <Rect x='208' y='359' rx='0' ry='0' width='64' height='1' />
    <Rect x='280' y='360' rx='0' ry='0' width='43' height='2' />
    <Rect x='247' y='351' rx='0' ry='0' width='13' height='1' />
    <Rect x='264' y='352' rx='0' ry='0' width='59' height='14' />
    <Rect x='63' y='387' rx='0' ry='0' width='139' height='27' />
  </ContentLoader>
);
