import { User } from '../../models/User';
import UserAvatar from './UserAvatar';


interface UserProfileProps {
    user?: User;
}

export default function UserProfile(props: UserProfileProps) {
    const {user} = props;

    return (
        <> {user ? (
            <>
                <UserAvatar
                    user={user}
                    isHorizontal={false}
                    hideName={false}
                />
                <h2 className="favorites-heading">
                    {user?.firstname}'s favorites
                </h2>
                <div className="favorites-grid">
                    {user?.favorites
                        ?.slice(0, 4)
                        .map((favorite: any) => (
                            <div
                                key={favorite._id}
                                className="favorite-box"
                            >
                                <h3>{favorite.type.name}</h3>
                                <p>{favorite.name}</p>
                            </div>
                        ))}
                </div>
            </>
        ) : null}
        </>
    );
}