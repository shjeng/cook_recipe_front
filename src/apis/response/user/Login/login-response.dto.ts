export default interface LoginResponseDto {
    token: string;
    expirationTime: number;
    referer: string | null;
}