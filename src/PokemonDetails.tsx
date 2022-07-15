import React from "react";
import { Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { MyProps } from "./types";

const PokemonDetails: React.FC<MyProps> = ({details, changeShown}) =>{
    console.log(details);    

    if (!details) return null
  
    return (
      <Card className='Card' sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar src={details.img} sx={{ bgcolor: red[500] }} aria-label="pokemon">
              {details.name?.charAt(0) ?? "?"}
            </Avatar>
          }
          title={details.name}
          subheader={details.type?.map( item => `${item.type.name} ` ) }
        />
        <CardMedia
          component="img"
          height="auto"
          image={details.img}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="subtitle1" >
            Abilities:
          </Typography>
          <ul>
            {details.abilities?.map( (item) => <li key={item.ability.name}><Typography variant="subtitle2">{item.ability.name}</Typography></li> )}
          </ul>
        </CardContent>
        <CardActions sx={{flexDirection:"row-reverse"}}>        
          <IconButton aria-label="add to favorites" >
            <ArrowBackIcon sx={{color:"#000"}} onClick={changeShown} />
          </IconButton>
        </CardActions>
      </Card>
    );
  }

  export default PokemonDetails