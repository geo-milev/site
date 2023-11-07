export enum AchievementCategory {
    Olympiads = "olympiads",
    Sports = "sports",
    Arts = "arts",
}

export const categories = [
    AchievementCategory.Olympiads.toString(),
    AchievementCategory.Sports.toString(),
    AchievementCategory.Arts.toString(),
];

export const categoryKeys = {
    olympiads: "олимпиади",
    sports: "спорт",
    arts: "творчество",
};

export const getAchievementQuery = (
    achievementCategory: AchievementCategory
) => {
    return `query {
    	allNews(limit: 10, draft: false, sort: "-publishDate",where: { AND: [{successCategory: { equals: ${achievementCategory.toString()}}}, {isSuccess: { equals: true}}]}) {
    	    docs {
    	        title
    	        description
    	        postImage {
    	            url
    	            alt
    	        }
    	        publishDate
    	        id
    	    }
    	}
    }`;
};

export const getAchievementQueryWithPagination = (
    achievementCategory: AchievementCategory
) => {
    return `query($page: Int!) {
    	allNews(page: $page, draft: false, limit: 10, sort: "-publishDate",where: { AND: [{successCategory: { equals: ${achievementCategory.toString()}}}, {isSuccess: { equals: true}}]}) {
    	    docs {
    	        title
    	        description
    	        postImage {
    	            url
    	            alt
    	        }
    	        publishDate
    	        id
    	    }
			hasNextPage,
    	}
    }`;
};
