import {React, useContext} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { UserContext } from '../App';
import EraseComment from './EraseComment'

const Comment = ({ comment, questionId, setComments }) => {
  const { userInfo } = useContext(UserContext);

    return (
        <Card style={{ margin: '16px', padding: '8px' }}>
            <CardHeader title={comment.authorName} subheader={new Date(comment.createdAt).toLocaleString()} />
            <CardContent>
                <Typography variant="h6">{comment.title}</Typography>
                <Typography variant="body1">{comment.content}</Typography>
                {userInfo.data.user.role === "admin" && <EraseComment comment={comment} questionId={questionId} setComments={setComments}/>}
                {comment.replies && comment.replies.length > 0 && (
                    <List>
                        {comment.replies.map((reply) => (
                            <ListItem key={reply.id}>
                                <Comment comment={reply} />
                            </ListItem>
                        ))}
                    </List>
                )}
            </CardContent>
        </Card>
    );
};
export default Comment;