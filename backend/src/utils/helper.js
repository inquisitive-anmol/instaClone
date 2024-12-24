class Helper {
    static formatResponse(success, message, data = null) {
        return {
            success,
            message,
            data,
        }
    }

    static paginateResults(page, limit) {
        const pageNumber = parseInt(page, 10) || 1;
        const limitNumber = parseInt(limit, 10) || 10;
        const skip = (pageNumber - 1) * limitNumber;
        return {
            limit: limitNumber,
            skip,
            pageNumber,
        }
    }

    static sanitizeUser(user) {
        const { password, __v, ...sanitizedUser } = user.toObject();
        return sanitizedUser;
    }

    static sanitizePost(post) {
        const { __v, ...sanitizedPost } = post.toObject();
        return sanitizedPost;
    }

    static sanitizeComment(comment) {
        const { __v, ...sanitizedComment } = comment.toObject();
        return sanitizedComment;
    }

    static sanitizeLike(like) {
        const { __v, ...sanitizedLike } = like.toObject();
        return sanitizedLike;
    }

    static sanitizeFollow(follow) {
        const { __v, ...sanitizedFollow } = follow.toObject();
        return sanitizedFollow;
    }

    static sanitizeNotification(notification) {
        const { __v, ...sanitizedNotification } = notification.toObject();
        return sanitizedNotification;
    }

    static sanitizeMessage(message) {
        const { __v, ...sanitizedMessage } = message.toObject();
        return sanitizedMessage;
    }

    static generateRandomString(length) {
        return crypto.randomBytes(length).toString("hex");
    }
}


module.exports = Helper;