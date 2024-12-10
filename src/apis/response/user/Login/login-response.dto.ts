export default interface LoginResponseDto {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiredMs: number;
    refreshTokenExpiredMs: number;
    referer: string | null;
}