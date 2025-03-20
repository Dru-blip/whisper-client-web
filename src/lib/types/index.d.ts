export interface User {
	id: string;
	email: string;
	name: string;
	bio: string;
	onboarded: boolean;
	profilePicture: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface FriendRequest {
	id: string;
	sender: User;
	receiver: User;
	status: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface Friend {
	id: string;
	initiator: User;
	receiver: User;
	createdAt: Date;
	updatedAt: Date;
}

export type InitiatedFriendShips = Friend[];
export type ReceivedFriendShips = Friend[];

export type FriendRequests = {
	incomingFriendRequests: FriendRequest[];
	outgoingFriendRequests: FriendRequest[];
};

interface ServerToClientEvents {
	'friendRequest:receive': (data: { friendRequest: FriendRequest }) => void;
}

interface ClientToServerEvents {
	hello: () => void;
}
