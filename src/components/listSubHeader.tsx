import * as React from 'react';
import List from '@mui/material/List';
import { Divider } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { SubHeaderListProps } from '../helpers/types';

export const SubHeaderList: React.FC<SubHeaderListProps> = ({ reserveDetail }: SubHeaderListProps) => {
    const promotions: any[] = [];
    const services: any[] = [];
    const microServices: any[] = [];

    reserveDetail.forEach(({ promotion, service, microServicio }) => {
        if (promotion) promotions.push(promotion);
        if (service) services.push(service);
        if (microServicio) microServices.push(microServicio);
    });

    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'secondary.main',
                overflow: 'auto',
                maxHeight: 125,
                '& ul': { padding: 0 },
            }}
            subheader={<li />}
        >
            {(promotions.length > 0) ? <li key={"Promocion"}>
                <ul>
                    <ListSubheader>Promocion</ListSubheader>
                    {promotions.map(({ name, precio }, index) => (
                        <ListItem sx={{ textAlign: "center" }} key={`objeto-Promocion-${name}`}>
                            <ListItemText secondary={`S/. ${precio}`} primary={`${index + 1}. ${name}`} />
                        </ListItem>
                    ))}
                </ul>
            </li> : null}

            {(services.length > 0) ? <li key={"Servicio"}>
                <ul>
                    <ListSubheader>Servicio</ListSubheader>
                    {services.map(({ description, price }, index) => (
                        <ListItem sx={{ textAlign: "center" }} key={`objeto-Servicio-${description}`}>
                            <ListItemText primary={`${index + 1}. ${description}`} secondary={` S/. ${price}`} />
                        </ListItem>
                    ))}
                </ul>
            </li> : null}

            {(microServices.length > 0) ?
                <li key={"Microservicio"}>
                    <ul>
                        <ListSubheader>Microservicio</ListSubheader>
                        {microServices.map(({ name, price }, index) => (
                            <ListItem sx={{ textAlign: "center" }} key={`objeto-Microservicio-${name}`}>
                                <ListItemText primary={`${index + 1}. ${name}`} secondary={`S/. ${price}`} />
                            </ListItem>
                        ))}
                    </ul>
                </li> : null}
        </List>
    );
}