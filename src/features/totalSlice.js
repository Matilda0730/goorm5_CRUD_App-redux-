import { createSlice } from "@reduxjs/toolkit";
import { tasks } from App.js;

const initialState = {
	total: [],
};

const TOTAL = 'TOTAL'

const totalSlice = () => ({
	type: TOTAL,
	
	tasks.reduce((total, item) => total + item.price, 0)

});
