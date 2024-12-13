"use client";

import { getMoviesAsync } from "@/store/slices/movieSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state: any) => state.movies);
  console.log(movies);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getMoviesAsync("batman"));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch]);

  return <div className=""></div>;
};

export default Home;
