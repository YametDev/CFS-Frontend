import { Container } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { receive } from "../redux/actions";
import { receiveDetailReview } from "../redux/actions/review";

const valueFormatter = value => `${value}%`;

const series = [
  {
    data: [2, 3, 1, 4, 5],
    label: 'Series A',
    valueFormatter
  },
  {
    data: [3, 1, 4, 2, 1],
    label: 'Series B',
    valueFormatter
  },
  {
    data: [3, 2, 4, 5, 1],
    label: 'Series C',
    valueFormatter
  }
];

const title = [
  'Wait Time',
  'Staff Friendliness',
  'Cleanliness',
  'Value and Prices',
  'Quality of Products'
];

const AdminPage = () => {
  const chartSetting = {
    width: 500,
    height: 300,
  };
  const dispatch = useDispatch();

  const review_normal = useSelector(state => state.review);
  const review_detail = useSelector(state => state.reviewdetail);
  const [detail, setDetail] = useState(series);

  useEffect(() => {
    dispatch(receive());
    dispatch(receiveDetailReview());
  }, [])

  useEffect(() => {
    setDetail(review_detail.map(val => ({
      ...val,
      valueFormatter
    })));
  }, [review_detail])

  return (
    <Container
      maxWidth={false}
      sx={{
        alignItems: "center",
        height: "100vh",
        background: "lightgray"
      }}
    >
      <BarChart
        dataset={review_normal}
        yAxis={[ {
          scaleType: 'band', dataKey: 'level'
        } ]}
        series={[ {
          dataKey: 'percentage', label: '', valueFormatter
        } ]}
        xAxis={[{
          label: 'Percentage (%)',
          min: 0,
          max: 100,
        }]}
        layout="horizontal"
        {...chartSetting}
      />
      
      <BarChart
        yAxis={[{ scaleType: 'band', data: title }]}
        xAxis={[{
          label: 'Percentage (%)',
          min: 0,
          max: 100,
        }]}
        series={detail}
        layout="horizontal"
        {...chartSetting}
      />
    </Container>
  );
};

export default AdminPage;