/**
 * Utility functions for building member image paths
 */

/**
 * Builds the image path for a member based on their group and name
 * @param groupName - The name of the group (e.g., "櫻坂46", "乃木坂46", "日向坂46")
 * @param memberName - The name of the member
 * @param graduated - Whether the member has graduated (defaults to placeholder image)
 * @returns The full path to the member's image
 */
export function buildMemberImagePath(
  groupName: string,
  memberName: string,
  graduated: boolean = false,
  withBackground: boolean = true,
): string {
  // If member has graduated, return placeholder
  if (graduated) {
    return '/images/placeholder.webp';
  }

  if(withBackground) {
    // Build path without background
    return `/images/members/${groupName}/${memberName}_background.jpg`;
  }
  // Build path: /images/members/{groupName}/{memberName}.png
  // Note: We use .png now since backgrounds were removed and saved as PNG
  return `/images/members/${groupName}/${memberName}.png`;
}

type getMemberImagePathOptions = {
  withBackground?: boolean;
}

/**
 * Builds the image path for a member from a Member object
 * @param member - The member object
 * @returns The full path to the member's image
 */
export function getMemberImagePath(member: { name: string; group: string; graduated?: boolean }, {withBackground}:getMemberImagePathOptions): string {
  return buildMemberImagePath(member.group, member.name, member.graduated, withBackground);
}
