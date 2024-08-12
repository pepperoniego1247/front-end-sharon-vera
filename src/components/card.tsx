import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box} from '@mui/material';
import { MediaCardProps } from '../helpers/types';

export const MediaCard: React.FC<MediaCardProps> = ({ data, setData, list, setCounter, counter, setListProduct, listProduct }: MediaCardProps) => {
  data["cantidadSolicitada"] = 1;
  const inStock = (data["cantidad"] > 0) ? true : false;

  return (
    <Card sx={{ width: { xs: "90vw", lg: "22.24vw" }, position: "relative" }}>
      <CardMedia
        sx={{ height: { xs: 200, lg: 200 }, objectFit: "fill" }}
        image={data["image"]}
        title={data["name"]}
      />
      <CardContent sx={{ height: "30%" }}>
        <Typography gutterBottom variant="h5" component="div">
          {data["name"]}
        </Typography>
        <Typography variant="body2" sx={{ height: "4.5vh" }} color="text.secondary">
          {data["description"]}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          disabled={!inStock} 
          sx={{ 
            backgroundColor: inStock ? "green" : "#672121", 
            color: "white" 
          }} 
          onClick={() => {
            if (inStock) {
              setData([...list, data]);
              setListProduct((prevList: any) => prevList.filter((item: any) => item["name"] !== data["name"]));
              setCounter(counter + 1);
            }
          }} 
          size="small"
        >
          {inStock ? "Agregar" : "Sin stock"}
        </Button>
        <Typography variant="body2" color="text.secondary">
          Precio unitario: S/. {data["price"]}
        </Typography>
        <Box sx={{
          width: "9vh",
          height: "3.5vh",
          borderRadius: "5px",
          position: "absolute",
          right: "1vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#040f13"
        }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Cant:</strong> {data["cantidad"]}
          </Typography>
        </Box>
      </CardActions>
    </Card>
  );
}
