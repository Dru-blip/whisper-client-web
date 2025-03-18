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

export type FriendRequests = {
	incomingFriendRequests: FriendRequest[];
	outgoingFriendRequests: FriendRequest[];
};
