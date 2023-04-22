import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Checkbox, List, ListItem } from '@mui/material';
import { BillHelpersList } from '../pages/dashboard/bills/Form';
import OptionsMenu from './OptionsMenu';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ExpandCard({title, mainContent, options, itemId, expandTitle, expandContent, bottomActions}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const content = <>
            {mainContent.map(
                (c, index) => 
                <React.Fragment key={index}>
                    {c.title}: <Typography color="text.secondary">{c.content}</Typography>
                    <br />
                </React.Fragment>)}
        </>
        
    const emptyExpandContent = expandContent !== null && expandContent !== undefined && expandContent.trim() !== '';

    const actions = bottomActions.map((action, index) =>
        <React.Fragment key={`act-${index}`}>   
            {action.content} {action.title}
        </React.Fragment>
    )

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <OptionsMenu  options={options} itemId={itemId} ></OptionsMenu>
        }
        title={title}
      />
      <CardContent>
        {content}
      </CardContent>

      <CardActions disableSpacing>
        {actions}
        {emptyExpandContent
        &&
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        }
      </CardActions>
      {emptyExpandContent
      && 
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>{expandTitle}</Typography>
          <Typography paragraph>
            {expandContent}
          </Typography>
        </CardContent>
      </Collapse>
      }
    </Card>
  );
}