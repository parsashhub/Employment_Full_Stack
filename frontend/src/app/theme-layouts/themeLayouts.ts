import React, { ComponentType } from 'react';
import Layout1 from './layout1/Layout1';

export type themeLayoutsType = {
	[key: string]: ComponentType<{ children?: React.ReactNode }>;
};

const themeLayouts: themeLayoutsType = {
	layout1: Layout1,
};

export default themeLayouts;
